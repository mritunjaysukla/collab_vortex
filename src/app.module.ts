import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CreatorProfileModule } from './creator-profile/creator-profile.module';
import { BrandProfileModule } from './brand-profile/brand-profile.module';
import { CampaignModule } from './campaigns/campaigns.module';
import { ProposalModule } from './proposals/proposals.module';
import { CollaborationModule } from './collaborations/collaborations.module';
import { ContractModule } from './contracts/contracts.module';
import { DeliverableModule } from './deliverables/deliverables.module';
import { MessageModule } from './messages/messages.module';
import { NotificationModule } from './notifications/notifications.module';
import { ReviewModule } from './reviews/reviews.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PlatformIntegrationModule } from './platform-integrations/platform-integrations.module';
import { PaymentModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';
import { ConnectionsModule } from './connections/connections.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development' ? ['error'] : false,
      logger: 'advanced-console',
    }),
    AuthModule,
    UsersModule,
    CreatorProfileModule,
    BrandProfileModule,
    CampaignModule,
    ProposalModule,
    CollaborationModule,
    ContractModule,
    DeliverableModule,
    MessageModule,
    NotificationModule,
    ReviewModule,
    AnalyticsModule,
    PlatformIntegrationModule,
    PaymentModule,
    ChatModule,
    ConnectionsModule,
    CommonModule,
  ],
})
export class AppModule { }
