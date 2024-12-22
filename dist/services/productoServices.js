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
exports.getProductosByTiendaSortedByQuantity = exports.getProductosByName = exports.deleteProducto = exports.moveProducto = exports.updateProducto = exports.getProductoByName = exports.getProductoById = exports.addProducto = exports.getAllProductos = void 0;
const data_source_1 = require("../data-source");
const Producto_1 = require("../entities/Producto");
const Tienda_1 = require("../entities/Tienda");
const Producto_Precio_1 = require("../entities/Producto_Precio");
const AuxiliarFunctions_1 = require("../helpers/AuxiliarFunctions");
const TiendaProductoPrecio_1 = require("../entities/TiendaProductoPrecio");
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
        const precioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
        // Crear un nuevo producto
        const newProducto = productoRepository.create(productoData);
        yield productoRepository.save(newProducto);
        // Crear un nuevo precio asociado al producto
        const newPrecio = precioRepository.create({ precio: productoData.precio, producto: newProducto });
        yield precioRepository.save(newPrecio);
        return newProducto; // Devolver el producto recién creado
    }
    return null;
});
exports.addProducto = addProducto;
// Obtener un producto por ID
const getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    return yield productoRepository.findOneBy({ id_producto: id });
});
exports.getProductoById = getProductoById;
// Obtener un producto por nombre
const getProductoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    return yield productoRepository.findOneBy({ nombre: name });
});
exports.getProductoByName = getProductoByName;
// Actualizar un producto
const updateProducto = (id, productoData) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield (0, exports.getProductosByName)(String(productoData.nombre))).length <= 1) {
        const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
        yield productoRepository.update(id, productoData);
        return yield productoRepository.findOneBy({ id_producto: id });
    }
    else
        return null;
});
exports.updateProducto = updateProducto;
//mover producto a una tienda
const moveProducto = (idTiendaProductoPrecio, idTienda) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    const tiendaRepository = data_source_1.AppDataSource.getRepository(Tienda_1.Tienda);
    // Buscar el registro de TiendaProductoPrecio por su ID
    const elemento = yield tiendaProductoPrecioRepository.findOneBy({ id_tiendaProductoPrecio: idTiendaProductoPrecio });
    if (!elemento) {
        return null; // Devolver null si no se encuentra el registro
    }
    // Obtener la nueva tienda basada en el ID proporcionado
    const nuevaTienda = yield tiendaRepository.findOneBy({ id_tienda: idTienda });
    if (!nuevaTienda) {
        return null; // Devolver null si no se encuentra la nueva tienda
    }
    // Cambiar la tienda asociada al registro de TiendaProductoPrecio
    elemento.tienda = nuevaTienda;
    // Guardar los cambios en la base de datos
    yield tiendaProductoPrecioRepository.save(elemento);
    return elemento; // Devolver el registro actualizado
});
exports.moveProducto = moveProducto;
// Eliminar un producto
const deleteProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    // Obtener el producto por su ID
    const producto = yield productoRepository.findOneBy({ id_producto: id });
    if (!producto) {
        return false; // Devolver false si no se encuentra el producto
    }
    // Eliminar los registros relacionados en la tabla Producto_Precio
    yield producto.producto_precios.forEach((productoPrecio) => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio).delete(productoPrecio.id_producto_precio);
    }));
    // Eliminar el producto en la tabla Producto
    const result = yield productoRepository.delete(id);
    // Verificar que se haya eliminado al menos un registro
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
});
exports.deleteProducto = deleteProducto;
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
// Obtener productos de Tienda (id) ordenados por cantidad 
const getProductosByTiendaSortedByQuantity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    const productos = yield tiendaProductoPrecioRepository.find({
        where: { tienda: { id_tienda: id } }, // Filtrar por id de la tienda
        order: { cantidad_en_tienda: "ASC" }, // Ordenar por cantidad
        relations: ["tienda", "producto_precio"] // Cargar las relaciones con Tienda y Producto_Precio
    });
    return productos;
});
exports.getProductosByTiendaSortedByQuantity = getProductosByTiendaSortedByQuantity;
