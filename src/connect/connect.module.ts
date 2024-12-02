import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/gateway/chat.gateway';
import { ChatController } from './chat/controllers/chat.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ChatController],
  providers: [ChatGateway],
})
export class ConnnectModule {}
