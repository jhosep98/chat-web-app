import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationEntity as Conversation } from 'src/conversations/entity/conversation.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn({ name: 'message_id' })
  messageId: number;

  @Column({ type: 'varchar', length: 280, nullable: false })
  text: string;

  @ManyToOne((type) => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}
