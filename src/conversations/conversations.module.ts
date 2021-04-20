import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsController } from './conversations.controller';
import { MessagesEntity as Message } from './entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [ConversationsController],
})
export class ConversationsModule {}
