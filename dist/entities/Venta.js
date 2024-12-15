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
exports.Venta = void 0;
const typeorm_1 = require("typeorm");
const Tienda_1 = require("./Tienda"); // Asegúrate de importar la entidad Tienda
const TiendaProductoPrecio_1 = require("./TiendaProductoPrecio");
let Venta = class Venta {
};
exports.Venta = Venta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Venta.prototype, "id_venta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tienda_1.Tienda, tienda => tienda.ventas),
    __metadata("design:type", Tienda_1.Tienda)
], Venta.prototype, "tienda", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TiendaProductoPrecio_1.TiendaProductoPrecio, producto_precio => producto_precio.ventas),
    __metadata("design:type", TiendaProductoPrecio_1.TiendaProductoPrecio)
], Venta.prototype, "producto_precio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Venta.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Venta.prototype, "precio", void 0);
exports.Venta = Venta = __decorate([
    (0, typeorm_1.Entity)()
], Venta);
