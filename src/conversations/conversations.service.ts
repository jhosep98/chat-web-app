import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConversationDto } from 'src/messages/dto/create-conversation.dto';
import { Repository } from 'typeorm';
import { ConversationEntity } from './entity/conversation.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
  ) {}

  async start(conversationDto: CreateConversationDto) {
    const newConversation = this.conversationRepository.create(conversationDto);
    const conversation = await this.conversationRepository.save(
      newConversation,
    );
    return conversation;
  }
}
