import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('conversations')
export class ConversationsController {
  @Get(':userId')
  getAll(@Param('userId') userId: number): string {
    console.log(userId);
    return `List conversations userId: ${userId}`;
  }

  @Post()
  createConversation(@Body() conversationDTO) {
    console.log(conversationDTO);
    return 'create conversation';
  }

  @Post('message')
  createMessage(@Body() conversationDTO) {
    console.log(conversationDTO);
    return 'create conversation';
  }
}
