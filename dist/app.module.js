"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const creator_profile_module_1 = require("./creator-profile/creator-profile.module");
const brand_profile_module_1 = require("./brand-profile/brand-profile.module");
const campaigns_module_1 = require("./campaigns/campaigns.module");
const proposals_module_1 = require("./proposals/proposals.module");
const collaborations_module_1 = require("./collaborations/collaborations.module");
const contracts_module_1 = require("./contracts/contracts.module");
const deliverables_module_1 = require("./deliverables/deliverables.module");
const messages_module_1 = require("./messages/messages.module");
const notifications_module_1 = require("./notifications/notifications.module");
const reviews_module_1 = require("./reviews/reviews.module");
const analytics_module_1 = require("./analytics/analytics.module");
const platform_integrations_module_1 = require("./platform-integrations/platform-integrations.module");
const payments_module_1 = require("./payments/payments.module");
const chat_module_1 = require("./chat/chat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
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
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            creator_profile_module_1.CreatorProfileModule,
            brand_profile_module_1.BrandProfileModule,
            campaigns_module_1.CampaignModule,
            proposals_module_1.ProposalModule,
            collaborations_module_1.CollaborationModule,
            contracts_module_1.ContractModule,
            deliverables_module_1.DeliverableModule,
            messages_module_1.MessageModule,
            notifications_module_1.NotificationModule,
            reviews_module_1.ReviewModule,
            analytics_module_1.AnalyticsModule,
            platform_integrations_module_1.PlatformIntegrationModule,
            payments_module_1.PaymentModule,
            chat_module_1.ChatModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map