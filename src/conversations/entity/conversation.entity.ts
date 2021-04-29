import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('conversation')
export class ConversationEntity {
  @PrimaryGeneratedColumn({ name: ' conversation_id' })
  id: number;
}
