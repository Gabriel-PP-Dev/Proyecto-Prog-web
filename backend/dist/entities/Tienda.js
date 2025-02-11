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
exports.Tienda = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario"); // Asegúrate de importar la entidad Usuario
const TiendaProductoPrecio_1 = require("./TiendaProductoPrecio"); // Asegúrate de importar la entidad TiendaProductoPrecio
const Venta_1 = require("./Venta"); // Asegúrate de importar la entidad Venta
let Tienda = class Tienda {
};
exports.Tienda = Tienda;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tienda.prototype, "id_tienda", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tienda.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tienda.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Usuario_1.Usuario, usuario => usuario.tienda),
    __metadata("design:type", Array)
], Tienda.prototype, "usuarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TiendaProductoPrecio_1.TiendaProductoPrecio, tiendaProductoPrecio => tiendaProductoPrecio.tienda),
    __metadata("design:type", Array)
], Tienda.prototype, "tiendaProductoPrecios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Venta_1.Venta, venta => venta.tienda),
    __metadata("design:type", Array)
], Tienda.prototype, "ventas", void 0);
exports.Tienda = Tienda = __decorate([
    (0, typeorm_1.Entity)()
], Tienda);
