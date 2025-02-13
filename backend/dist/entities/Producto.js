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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
const Producto_Precio_1 = require("./Producto_Precio");
let Producto = class Producto {
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Producto.prototype, "id_producto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Producto_Precio_1.Producto_Precio, producto_precio => producto_precio.producto, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_producto" }),
    __metadata("design:type", Array)
], Producto.prototype, "producto_precios", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)()
], Producto);
