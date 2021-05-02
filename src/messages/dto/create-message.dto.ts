import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ConversationEntity } from 'src/conversations/entity/conversation.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  text: string;

  @IsNotEmpty()
  @IsInt()
  conversation: ConversationEntity;
}
