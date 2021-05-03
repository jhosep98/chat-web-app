import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserEntity } from 'src/users/entity/user.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsInt()
  sender: UserEntity;

  @IsNotEmpty()
  @IsInt()
  target: UserEntity;

  @IsArray()
  messages: MessageEntity[];

  @IsNotEmpty()
  @IsInt()
  userId: UserEntity;
}
