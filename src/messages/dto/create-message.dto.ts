import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ConversationEntity } from 'src/conversations/entity/conversation.entity';
import { UserEntity } from 'src/users/entity/user.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  text: string;

  @IsNotEmpty()
  @IsInt()
  conversation: ConversationEntity;

  @IsNotEmpty()
  @IsArray()
  user: UserEntity;
}
