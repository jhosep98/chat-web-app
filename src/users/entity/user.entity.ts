import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ConversationEntity } from 'src/conversations/entity/conversation.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 128, nullable: false, select: false })
  password: string;

  @Column({ type: 'simple-array' })
  roles: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(
    (type) => ConversationEntity,
    (conversation) => conversation.userId,
  )
  @JoinColumn({ name: 'user_id' })
  conversationId: ConversationEntity[];

  @OneToMany(
    (type) => ConversationEntity,
    (conversation) => conversation.sender,
  )
  @JoinColumn({ name: 'sender_id' })
  startedConversations: ConversationEntity[];

  @OneToMany(
    (type) => ConversationEntity,
    (conversation) => conversation.target,
  )
  @JoinColumn({ name: 'target_id' })
  targetConversations: ConversationEntity[];

  @OneToMany((type) => MessageEntity, (message) => message.user)
  @JoinColumn({ name: 'conversation_id' })
  messages: MessageEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
