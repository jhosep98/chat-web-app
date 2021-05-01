import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { Response } from 'express';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CREATED_CONVERSATION } from 'src/config/constants';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const conversations = await this.conversationService.findAll();
    res.status(HttpStatus.OK).json({
      data: conversations,
    });
  }

  @Post()
  async startedConversation(
    @Body() createConversation: CreateConversationDto,
    @Res() res: Response,
  ) {
    const createdConversation = await this.conversationService.start(
      createConversation,
    );
    res.status(HttpStatus.CREATED).json({
      message: CREATED_CONVERSATION,
      data: createdConversation,
    });
  }
}
