import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity as Message } from 'src/messages/entity/message.entity';
import { UserEntity } from 'src/users/entity/user.entity';

@Entity('conversation')
export class ConversationEntity {
  @PrimaryGeneratedColumn({ name: ' conversation_id' })
  id: number;

  @Column()
  name: string;

  @ManyToOne((type) => UserEntity, (user) => user.startedConversations)
  @JoinColumn({ name: 'sender_id' })
  sender: UserEntity;

  @ManyToOne((type) => UserEntity, (user) => user.targetConversations)
  @JoinColumn({ name: 'target_id' })
  target: UserEntity;

  @ManyToOne((type) => UserEntity, (user) => user.conversationId)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;

  @OneToMany((type) => Message, (message) => message.conversation)
  @JoinColumn({ name: 'conversation_id' })
  messages: Message[];
}
