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
const TiendaProductoPrecio_1 = require("./TiendaProductoPrecio"); // Asegúrate de importar la entidad TiendaProductoPrecio
const Producto_1 = require("./Producto");
let Producto_Precio = class Producto_Precio {
};
exports.Producto_Precio = Producto_Precio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto_Precio.prototype, "id_producto_precio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto_Precio.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TiendaProductoPrecio_1.TiendaProductoPrecio, tiendaProductoPrecio => tiendaProductoPrecio.producto_precio),
    __metadata("design:type", Array)
], Producto_Precio.prototype, "tiendaProductoPrecios", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Producto_1.Producto, producto => producto.producto_precios),
    __metadata("design:type", Producto_1.Producto)
], Producto_Precio.prototype, "producto", void 0);
exports.Producto_Precio = Producto_Precio = __decorate([
    (0, typeorm_1.Entity)()
], Producto_Precio);
