import { Body, Controller, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateConversationDto } from 'src/messages/dto/create-conversation.dto';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

  async startConversation(
    @Body() conversationDto: CreateConversationDto,
    @Res() res: Response,
  ) {
    const conversation = await this.conversationService.start(conversationDto);
    res.status(HttpStatus.CREATED).json({
      message: ' Created conversation',
      data: conversation,
    });
  }
}
