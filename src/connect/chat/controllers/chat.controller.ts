import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatDto } from '../dto/chat.dto';
import { ChatGateway } from '../gateway/chat.gateway';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
@ApiTags('Chat')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ChatController {
  constructor(private chatGateway: ChatGateway) {}

  @Post('')
  async chat(@Body() req: ChatDto) {
    this.chatGateway.handleMessage(req);
    return { message: 'Chat deleivered sucessfully' };
  }
}
