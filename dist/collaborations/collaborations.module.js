"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaborationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collaborations_service_1 = require("./collaborations.service");
const collaborations_controller_1 = require("./collaborations.controller");
const collaboration_entity_1 = require("./entities/collaboration.entity");
const campaigns_module_1 = require("../campaigns/campaigns.module");
const proposals_module_1 = require("../proposals/proposals.module");
let CollaborationModule = class CollaborationModule {
};
exports.CollaborationModule = CollaborationModule;
exports.CollaborationModule = CollaborationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([collaboration_entity_1.Collaboration]),
            campaigns_module_1.CampaignModule,
            proposals_module_1.ProposalModule,
        ],
        controllers: [collaborations_controller_1.CollaborationController],
        providers: [collaborations_service_1.CollaborationService],
        exports: [collaborations_service_1.CollaborationService],
    })
], CollaborationModule);
//# sourceMappingURL=collaborations.module.js.map