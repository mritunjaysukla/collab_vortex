"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const creator_profile_service_1 = require("./creator-profile.service");
const creator_profile_controller_1 = require("./creator-profile.controller");
const creator_profile_entity_1 = require("./entities/creator-profile.entity");
let CreatorProfileModule = class CreatorProfileModule {
};
exports.CreatorProfileModule = CreatorProfileModule;
exports.CreatorProfileModule = CreatorProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([creator_profile_entity_1.CreatorProfile])],
        controllers: [creator_profile_controller_1.CreatorProfileController],
        providers: [creator_profile_service_1.CreatorProfileService],
        exports: [creator_profile_service_1.CreatorProfileService],
    })
], CreatorProfileModule);
//# sourceMappingURL=creator-profile.module.js.map