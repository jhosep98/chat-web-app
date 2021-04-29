import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn({ name: 'message_id' })
  messageId: number;
}
