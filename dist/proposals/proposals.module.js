"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const proposals_service_1 = require("./proposals.service");
const proposals_controller_1 = require("./proposals.controller");
const proposal_entity_1 = require("./entities/proposal.entity");
const creator_profile_module_1 = require("../creator-profile/creator-profile.module");
const campaigns_module_1 = require("../campaigns/campaigns.module");
let ProposalModule = class ProposalModule {
};
exports.ProposalModule = ProposalModule;
exports.ProposalModule = ProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([proposal_entity_1.Proposal]),
            creator_profile_module_1.CreatorProfileModule,
            campaigns_module_1.CampaignModule,
        ],
        controllers: [proposals_controller_1.ProposalController],
        providers: [proposals_service_1.ProposalService],
        exports: [proposals_service_1.ProposalService],
    })
], ProposalModule);
//# sourceMappingURL=proposals.module.js.map