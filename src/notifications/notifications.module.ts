import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';
import { EmailService } from '../common/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService, EmailService],
  exports: [NotificationService],
})
export class NotificationModule { }
