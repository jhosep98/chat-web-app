import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ConversationEntity } from './entity/conversation.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
  ) {}
  async findAll() {
    const conversations = await this.conversationRepository.find();
    return conversations;
  }

  async start(conversationDto: CreateConversationDto) {
    const newConversation = this.conversationRepository.create(conversationDto);
    const conversation = await this.conversationRepository.save(
      newConversation,
    );
    return conversation;
  }
}
