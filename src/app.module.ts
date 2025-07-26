import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrandProfileModule } from './brand-profile/brand-profile.module';
import { CreatorProfileModule } from './creator-profile/creator-profile.module';
import { CommonModule } from './common/common.module';
import { ProfileCompletionGuard } from './auth/guards/profile-completion.guard';
import { ProposalModule } from './proposals/proposals.module';
import { ConnectionsModule } from './connections/connections.module';
import { DeliverableModule } from './deliverables/deliverables.module';
import { PlatformIntegrationModule } from './platform-integrations/platform-integrations.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CampaignModule } from './campaigns/campaigns.module';
import { CollaborationModule } from './collaborations/collaborations.module';
import { ContractModule } from './contracts/contracts.module';
import { MessageModule } from './messages/messages.module';
import { NotificationModule } from './notifications/notifications.module';
import { PaymentModule } from './payments/payments.module';
import { ReviewModule } from './reviews/reviews.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    JwtModule.register({}),
    AuthModule,
    UsersModule,
    BrandProfileModule,
    CreatorProfileModule,
    ProposalModule,
    CommonModule,
    ConnectionsModule,
    DeliverableModule,
    PlatformIntegrationModule,
    AnalyticsModule,
    CampaignModule,
    CollaborationModule,
    ContractModule,
    MessageModule,
    NotificationModule,
    PaymentModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ProfileCompletionGuard,
    },
  ],
})
export class AppModule { }
