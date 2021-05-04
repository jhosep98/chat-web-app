import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entity/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async findAll(conversationId: number) {
    const messages = await this.messageRepository.find({
      where: {
        conversation: conversationId,
      },
    });
    return messages;
  }

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create(createMessageDto);
    const message = await this.messageRepository.save(newMessage);
    return message;
  }
}
