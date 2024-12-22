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
exports.getProductosByName = exports.deleteProductoPrecio = exports.deleteProducto = exports.updateProducto = exports.getProductoById = exports.addPrecio = exports.getIdByName = exports.addProducto = exports.getAllProductos = void 0;
const data_source_1 = require("../data-source");
const Producto_1 = require("../entities/Producto");
const Producto_Precio_1 = require("../entities/Producto_Precio");
const AuxiliarFunctions_1 = require("../helpers/AuxiliarFunctions");
// Obtener todos los productos
const getAllProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    return yield productoRepository.find();
});
exports.getAllProductos = getAllProductos;
// Agregar un nuevo producto
const addProducto = (productoData) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield (0, exports.getProductosByName)(String(productoData.nombre))).length == 0) {
        const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
        const newProducto = productoRepository.create(productoData);
        const productoID = yield (0, exports.getIdByName)(String(productoData.nombre));
        yield productoRepository.save(newProducto);
        var newPrecio;
        if (productoID != null) {
            newPrecio = { productoId: productoID, precio: productoData.precio };
            yield (0, exports.addPrecio)(newPrecio); // Llamada a addPrecio
        }
        return newProducto;
    }
    else
        return null;
});
exports.addProducto = addProducto;
// Obtener id de producto por nombre 
const getIdByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name) {
        throw new Error("El nombre no puede ser vacío");
    }
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    const normalizedName = (0, AuxiliarFunctions_1.removeAccents)(name.toLowerCase()); // Normalizar el nombre buscado
    // Obtener todos los productos y filtrar en memoria
    const productos = yield productoRepository.find();
    // Buscar el primer producto que contenga el nombre normalizado
    const productoEncontrado = productos.find(producto => (0, AuxiliarFunctions_1.removeAccents)(producto.nombre.toLowerCase()).includes(normalizedName));
    // Si se encontró un producto, retornar su ID. Si no, retornar null.
    return productoEncontrado ? productoEncontrado.id_producto : null;
});
exports.getIdByName = getIdByName;
//Agregar precio a Producto_Precio
const addPrecio = (productoPrecio) => __awaiter(void 0, void 0, void 0, function* () {
    const productoPrecioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    const newProductoPrecio = productoPrecioRepository.create(productoPrecio);
    return yield productoPrecioRepository.save(newProductoPrecio);
});
exports.addPrecio = addPrecio;
// Obtener un producto por ID
const getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    return yield productoRepository.findOneBy({ id_producto: id });
});
exports.getProductoById = getProductoById;
// Actualizar un producto
const updateProducto = (id, productoData) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    yield productoRepository.update(id, productoData);
    return yield productoRepository.findOneBy({ id_producto: id });
});
exports.updateProducto = updateProducto;
// Eliminar un producto
const deleteProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    const result = yield productoRepository.delete(id);
    // Verifica que result.affected no sea null o undefined
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
});
exports.deleteProducto = deleteProducto;
// Eliminar producto en ProductoPrecio
const deleteProductoPrecio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoPrecioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    const deleteResult = yield productoPrecioRepository.delete(id);
    // Verifica que deleteResult.affected no sea null o undefined
    return deleteResult.affected !== null && deleteResult.affected !== undefined && deleteResult.affected > 0;
});
exports.deleteProductoPrecio = deleteProductoPrecio;
// Obtener productos por nombre (array)
const getProductosByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name) {
        throw new Error("El nombre no puede ser vacío");
    }
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    const normalizedName = (0, AuxiliarFunctions_1.removeAccents)(name.toLowerCase()); // Normalizar el nombre buscado
    // Obtener todos los productos y filtrar en memoria
    const productos = yield productoRepository.find();
    // Filtrar productos que contengan el nombre normalizado
    return productos.filter(producto => (0, AuxiliarFunctions_1.removeAccents)(producto.nombre.toLowerCase()).includes(normalizedName));
});
exports.getProductosByName = getProductosByName;
