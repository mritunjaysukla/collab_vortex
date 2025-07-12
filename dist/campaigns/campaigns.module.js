"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const campaigns_service_1 = require("./campaigns.service");
const campaigns_controller_1 = require("./campaigns.controller");
const campaign_entity_1 = require("./entities/campaign.entity");
const brand_profile_module_1 = require("../brand-profile/brand-profile.module");
let CampaignModule = class CampaignModule {
};
exports.CampaignModule = CampaignModule;
exports.CampaignModule = CampaignModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([campaign_entity_1.Campaign]),
            brand_profile_module_1.BrandProfileModule,
        ],
        controllers: [campaigns_controller_1.CampaignController],
        providers: [campaigns_service_1.CampaignService],
        exports: [campaigns_service_1.CampaignService],
    })
], CampaignModule);
//# sourceMappingURL=campaigns.module.js.map