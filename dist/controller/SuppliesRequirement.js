"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const leanengine_1 = require("leanengine");
const routing_controllers_1 = require("routing-controllers");
const utility_1 = require("../utility");
const Supplies_1 = require("../model/Supplies");
const Role_1 = require("./Role");
class SuppliesRequirement extends leanengine_1.Object {
}
exports.SuppliesRequirement = SuppliesRequirement;
let RequirementController = class RequirementController {
    async create({ currentUser: user }, _a) {
        var { hospital } = _a, rest = __rest(_a, ["hospital"]);
        let requirement = await new leanengine_1.Query(SuppliesRequirement)
            .equalTo('hospital', hospital)
            .first();
        if (requirement)
            throw new routing_controllers_1.ForbiddenError();
        const acl = new leanengine_1.ACL();
        acl.setPublicReadAccess(true),
            acl.setPublicWriteAccess(false),
            acl.setWriteAccess(user, true),
            acl.setRoleWriteAccess(await Role_1.RoleController.getAdmin(), true);
        requirement = await new SuppliesRequirement().save(Object.assign(Object.assign({}, rest), { hospital, creator: user }), { user });
        return requirement.toJSON();
    }
    getList(size, index) {
        return utility_1.queryPage(SuppliesRequirement, { size, index });
    }
    async edit({ currentUser: user }, id, _a) {
        var { hospital, address } = _a, rest = __rest(_a, ["hospital", "address"]);
        const requirement = leanengine_1.Object.createWithoutData('SuppliesRequirement', id);
        await requirement.save(rest, { user });
        return requirement.toJSON();
    }
    async delete({ currentUser: user }, id) {
        await leanengine_1.Object.createWithoutData('SuppliesRequirement', id).destroy({
            user
        });
    }
};
__decorate([
    routing_controllers_1.Post(),
    routing_controllers_1.Authorized(),
    __param(0, routing_controllers_1.Ctx()),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Supplies_1.RequirementModel]),
    __metadata("design:returntype", Promise)
], RequirementController.prototype, "create", null);
__decorate([
    routing_controllers_1.Get(),
    __param(0, routing_controllers_1.QueryParam('pageSize')),
    __param(1, routing_controllers_1.QueryParam('pageIndex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RequirementController.prototype, "getList", null);
__decorate([
    routing_controllers_1.Put('/:id'),
    __param(0, routing_controllers_1.Ctx()),
    __param(1, routing_controllers_1.Param('id')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Supplies_1.RequirementModel]),
    __metadata("design:returntype", Promise)
], RequirementController.prototype, "edit", null);
__decorate([
    routing_controllers_1.Delete('/:id'),
    routing_controllers_1.Authorized(),
    routing_controllers_1.OnUndefined(204),
    __param(0, routing_controllers_1.Ctx()),
    __param(1, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RequirementController.prototype, "delete", null);
RequirementController = __decorate([
    routing_controllers_1.JsonController('/supplies/requirement')
], RequirementController);
exports.RequirementController = RequirementController;
//# sourceMappingURL=SuppliesRequirement.js.map