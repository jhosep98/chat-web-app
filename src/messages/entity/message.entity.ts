import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConversationEntity as Conversation } from 'src/conversations/entity/conversation.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn({ name: 'message_id' })
  messageId: number;

  @ManyToOne((type) => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}