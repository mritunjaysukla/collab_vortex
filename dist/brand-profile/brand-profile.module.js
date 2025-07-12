"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const brand_profile_service_1 = require("./brand-profile.service");
const brand_profile_controller_1 = require("./brand-profile.controller");
const brand_profile_entity_1 = require("./entities/brand-profile.entity");
let BrandProfileModule = class BrandProfileModule {
};
exports.BrandProfileModule = BrandProfileModule;
exports.BrandProfileModule = BrandProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([brand_profile_entity_1.BrandProfile])],
        controllers: [brand_profile_controller_1.BrandProfileController],
        providers: [brand_profile_service_1.BrandProfileService],
        exports: [brand_profile_service_1.BrandProfileService],
    })
], BrandProfileModule);
//# sourceMappingURL=brand-profile.module.js.map