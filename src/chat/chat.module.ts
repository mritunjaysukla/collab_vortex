import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from '../messages/messages.module';
import { NotificationModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MessageModule,
    NotificationModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule { }
