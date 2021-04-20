import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('conversations')
export class ConversationsEntity {
  @PrimaryGeneratedColumn({ name: 'conversation_id' })
  conversationId: number;

  @Column()
  sender: string;

  @Column()
  received: string;

  @Column()
  messages: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
