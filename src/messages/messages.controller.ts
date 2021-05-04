import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CREATED_MESSAGE } from 'src/config/constants';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  async findAllMessages(@Res() res: Response, @Param('id') id: number) {
    const messages = await this.messagesService.findAll(id);
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
