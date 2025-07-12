"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverableModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const deliverable_entity_1 = require("./entities/deliverable.entity");
const deliverables_service_1 = require("./deliverables.service");
const deliverables_controller_1 = require("./deliverables.controller");
let DeliverableModule = class DeliverableModule {
};
exports.DeliverableModule = DeliverableModule;
exports.DeliverableModule = DeliverableModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([deliverable_entity_1.Deliverable])],
        controllers: [deliverables_controller_1.DeliverableController],
        providers: [deliverables_service_1.DeliverableService],
        exports: [deliverables_service_1.DeliverableService],
    })
], DeliverableModule);
//# sourceMappingURL=deliverables.module.js.map