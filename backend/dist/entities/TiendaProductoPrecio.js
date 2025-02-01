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
exports.TiendaProductoPrecio = void 0;
const typeorm_1 = require("typeorm");
const Tienda_1 = require("./Tienda"); // Asegúrate de importar la entidad Tienda
const Producto_Precio_1 = require("./Producto_Precio"); // Asegúrate de importar la entidad Producto_Precio
const Venta_1 = require("./Venta");
let TiendaProductoPrecio = class TiendaProductoPrecio {
};
exports.TiendaProductoPrecio = TiendaProductoPrecio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], TiendaProductoPrecio.prototype, "id_tiendaProductoPrecio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tienda_1.Tienda, tienda => tienda.tiendaProductoPrecios),
    (0, typeorm_1.JoinColumn)({ name: "id_tienda" }),
    __metadata("design:type", Tienda_1.Tienda)
], TiendaProductoPrecio.prototype, "tienda", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Producto_Precio_1.Producto_Precio, producto_precio => producto_precio.tiendaProductoPrecio),
    (0, typeorm_1.JoinColumn)({ name: "id_tiendaProductoPrecio" }),
    __metadata("design:type", Array)
], TiendaProductoPrecio.prototype, "producto_precios", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TiendaProductoPrecio.prototype, "cantidad_en_tienda", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Venta_1.Venta, venta => venta.producto_precio),
    (0, typeorm_1.JoinColumn)({ name: "id_tiendaProductoPrecio" }),
    __metadata("design:type", Array)
], TiendaProductoPrecio.prototype, "ventas", void 0);
exports.TiendaProductoPrecio = TiendaProductoPrecio = __decorate([
    (0, typeorm_1.Entity)()
], TiendaProductoPrecio);
