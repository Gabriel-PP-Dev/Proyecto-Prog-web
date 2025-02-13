"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducto_PrecioByProductId = exports.deleteProducto_Precio = exports.updateProducto_Precio = exports.getProducto_PrecioById = exports.addProducto_Precio = exports.getAllProducto_Precio = void 0;
const data_source_1 = require("../data-source");
const Producto_Precio_1 = require("../entities/Producto_Precio");
// Obtener todas las tiendas
const getAllProducto_Precio = () => __awaiter(void 0, void 0, void 0, function* () {
    const producto_precioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    return yield producto_precioRepository.find({
        relations: {
            producto: true, // Incluye la relación con producto y tiendaProductoPrecio
            tiendaProductoPrecio: true
        }
    });
});
exports.getAllProducto_Precio = getAllProducto_Precio;
// Agregar una nueva tienda
const addProducto_Precio = (producto_PrecioData) => __awaiter(void 0, void 0, void 0, function* () {
    const producto_PrecioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    const newProducto_Precio = producto_PrecioRepository.create(producto_PrecioData);
    return yield producto_PrecioRepository.save(newProducto_Precio);
});
exports.addProducto_Precio = addProducto_Precio;
// Obtener una tienda por ID
const getProducto_PrecioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const producto_PrecioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    return yield producto_PrecioRepository.findOne({
        where: { id_producto_precio: id },
        relations: {
            producto: true, // Incluye la relación con producto y tiendaProductoPrecio
            tiendaProductoPrecio: true
        }
    });
});
exports.getProducto_PrecioById = getProducto_PrecioById;
// Actualizar una tienda
const updateProducto_Precio = (id, tiendaData) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    yield tiendaRepository.update(id, tiendaData);
    return yield tiendaRepository.findOneBy({ id_producto_precio: id });
});
exports.updateProducto_Precio = updateProducto_Precio;
// Eliminar una tienda
const deleteProducto_Precio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    const result = yield tiendaRepository.delete(id);
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
});
exports.deleteProducto_Precio = deleteProducto_Precio;
// Obtener todos los producto_precio por ID de producto
const getProducto_PrecioByProductId = (id_producto) => __awaiter(void 0, void 0, void 0, function* () {
    const producto_PrecioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    return yield producto_PrecioRepository.find({
        where: { producto: { id_producto } },
        relations: ["producto"],
    });
});
exports.getProducto_PrecioByProductId = getProducto_PrecioByProductId;
// Obtener tiendas cuyo nombre contenga la cadena proporcionada
//export const getTiendaByName = async (name: string): Promise<Producto_Precio[]> => {
//    if (!name) {
//        throw new Error("El nombre no puede ser vacío");
//    }
//    
//    const tiendaRepository = AppDataSource.getRepository(Producto_Precio);
//    const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado
//
//    // Obtener todas las tiendas y filtrar en memoria
//    const tiendas = await tiendaRepository.find({
//        relations: {
//            producto: true, // Incluye la relación con producto y tiendaProductoPrecio
//        }
//    });
//
//    // Filtrar tiendas que contengan el nombre normalizado
//    return tiendas.filter(tienda => 
//        removeAccents(tienda.nombre.toLowerCase()).includes(normalizedName)
//    );
//};
