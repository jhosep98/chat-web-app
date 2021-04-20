import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity as User } from '../../users/entity/user.entity';

@Entity('messages')
export class MessagesEntity {
  @PrimaryGeneratedColumn({ name: 'message_id' })
  messageId: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
