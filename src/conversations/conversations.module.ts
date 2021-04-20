import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsController } from './conversations.controller';
import { MessagesEntity as Message } from './entity';
import { ConversationsEntity as Conversation } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Conversation])],
  controllers: [ConversationsController],
})
export class ConversationsModule {}
