import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CREATED_MESSAGE } from 'src/config/constants';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findAllMessages(@Res() res: Response) {
    const messages = await this.messagesService.findAll();
    res.status(HttpStatus.OK).json({
      data: messages,
    });
  }

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Res() res: Response,
  ) {
    const newMessage = await this.messagesService.create(createMessageDto);
    res.status(HttpStatus.CREATED).json({
      message: CREATED_MESSAGE,
      data: newMessage,
    });
  }
}
