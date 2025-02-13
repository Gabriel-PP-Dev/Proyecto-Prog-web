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
exports.Producto_Precio = void 0;
const typeorm_1 = require("typeorm");
const Producto_1 = require("./Producto");
const TiendaProductoPrecio_1 = require("./TiendaProductoPrecio");
let Producto_Precio = class Producto_Precio {
};
exports.Producto_Precio = Producto_Precio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Producto_Precio.prototype, "id_producto_precio", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Producto_Precio.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Producto_1.Producto, (producto) => producto.producto_precios),
    __metadata("design:type", Producto_1.Producto)
], Producto_Precio.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "id_producto" }),
    (0, typeorm_1.ManyToOne)(() => TiendaProductoPrecio_1.TiendaProductoPrecio, (tiendaProductoPrecio) => tiendaProductoPrecio.producto_precios, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_tiendaProductoPrecio" }),
    __metadata("design:type", TiendaProductoPrecio_1.TiendaProductoPrecio)
], Producto_Precio.prototype, "tiendaProductoPrecio", void 0);
exports.Producto_Precio = Producto_Precio = __decorate([
    (0, typeorm_1.Entity)()
], Producto_Precio);
