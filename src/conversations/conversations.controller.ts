import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { Response } from 'express';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CREATED_CONVERSATION } from 'src/config/constants';
import { JwtAuthGuard } from 'src/auth/guards';
import { User } from 'src/decorators';
import { UserEntity } from 'src/users/entity/user.entity';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res: Response, @User() user: UserEntity) {
    const conversations = await this.conversationService.findAll(user);
    res.status(HttpStatus.OK).json({
      data: conversations,
    });
  }

  @UseGuards(JwtAuthGuard)
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
