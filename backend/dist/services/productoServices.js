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
exports.getProductosByTiendaSortedByQuantity = exports.getProductosByName = exports.deleteProducto = exports.moveProducto = exports.moveTiendaProductoPrecio = exports.updateProducto = exports.getProductoByName = exports.getProductoById = exports.addProducto = exports.getAllProductos = void 0;
const data_source_1 = require("../data-source");
const Producto_1 = require("../entities/Producto");
const Tienda_1 = require("../entities/Tienda");
const Producto_Precio_1 = require("../entities/Producto_Precio");
const AuxiliarFunctions_1 = require("../helpers/AuxiliarFunctions");
const TiendaProductoPrecio_1 = require("../entities/TiendaProductoPrecio");
// Obtener todos los productos
const getAllProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    return yield productoRepository.find({
        relations: {
            producto_precios: true, // Incluye la relación con Producto_Precio
        }
    });
});
exports.getAllProductos = getAllProductos;
// Agregar un nuevo producto
const addProducto = (productoData) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield (0, exports.getProductosByName)(String(productoData.nombre))).length == 0) {
        const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
        const newProducto = productoRepository.create(productoData);
        return yield productoRepository.save(newProducto);
    }
    return null;
});
exports.addProducto = addProducto;
// Obtener un producto por ID
const getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    return yield productoRepository.findOne({
        where: { id_producto: id },
        relations: {
            producto_precios: true, // Incluye la relación con Producto_Precio
        }
    });
});
exports.getProductoById = getProductoById;
// Obtener un producto por nombre
const getProductoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    return yield productoRepository.findOne({
        where: { nombre: name },
        relations: {
            producto_precios: true, // Incluye la relación con Producto_Precio
        }
    });
});
exports.getProductoByName = getProductoByName;
// Actualizar un producto
const updateProducto = (id, productoData) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    yield productoRepository.update(id, productoData);
    return yield productoRepository.findOneBy({ id_producto: id });
});
exports.updateProducto = updateProducto;
//editar tienda en tiendaProductoPrecio
const moveTiendaProductoPrecio = (idTiendaProductoPrecio, idTienda) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.moveTiendaProductoPrecio = moveTiendaProductoPrecio;
// Mover producto a otra tienda
const moveProducto = (id_producto, id_tienda_destino, cantidad) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    const productoPrecioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    // Buscar el producto por su ID
    const producto = yield productoRepository.findOne({
        where: { id_producto },
        relations: ['producto_precios']
    });
    if (!producto) {
        return false; // Devolver false si no se encuentra el producto
    }
    // Obtener los Producto_Precio asociados al producto
    const productoPrecios = yield productoPrecioRepository.find({
        where: { producto: { id_producto } },
        relations: ['tiendaProductoPrecio']
    });
    for (const productoPrecio of productoPrecios) {
        // Obtener el TiendaProductoPrecio asociado al Producto_Precio
        const tiendaProductoPrecio = productoPrecio.tiendaProductoPrecio;
        if (tiendaProductoPrecio) {
            // Verificar si el TiendaProductoPrecio es de la tienda de origen
            if (tiendaProductoPrecio.tienda.id_tienda === id_tienda_destino) {
                // Actualizar la cantidad en la tienda de destino
                tiendaProductoPrecio.cantidad_en_tienda += cantidad;
                yield tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
            }
            else {
                // Verificar si el TiendaProductoPrecio es de la tienda de origen y tiene suficiente cantidad
                if (tiendaProductoPrecio.tienda.id_tienda !== id_tienda_destino && tiendaProductoPrecio.cantidad_en_tienda >= cantidad) {
                    // Actualizar la cantidad en la tienda de origen
                    tiendaProductoPrecio.cantidad_en_tienda -= cantidad;
                    yield tiendaProductoPrecioRepository.save(tiendaProductoPrecio);
                }
            }
        }
    }
    return true;
});
exports.moveProducto = moveProducto;
// Eliminar un producto
const deleteProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    const productoPrecioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
    // Obtener el producto por su ID con todas las relaciones cargadas
    const producto = yield productoRepository.findOneBy({ id_producto: id });
    if (!producto) {
        return false; // Devolver false si no se encuentra el producto
    }
    const precio = yield productoPrecioRepository.findOneBy({ producto: producto });
    if (!precio) {
        // Eliminar el producto en la tabla Producto
        const result = yield productoRepository.delete(id);
        // Verificar que se haya eliminado al menos un registro
        return result.affected !== null && result.affected !== undefined && result.affected > 0;
    }
    else
        return false; //el producto tiene un precio en Producto_Precio, por lo que no se puede eliminar
});
exports.deleteProducto = deleteProducto;
// Obtener productos cuyo nombre contenga la cadena proporcionada
const getProductosByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    const normalizedName = (0, AuxiliarFunctions_1.removeAccents)(name.toLowerCase()); // Normalizar el nombre buscado
    // Obtener todos los productos y filtrar en memoria
    const productos = yield productoRepository.find({
        relations: {
            producto_precios: true, // Incluye la relación con Producto_Precio
        }
    });
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
        relations: ["tienda", "producto_precio", "producto_precio.producto"] // Cargar las relaciones con Tienda, Producto_Precio y Producto
    });
    return productos;
});
exports.getProductosByTiendaSortedByQuantity = getProductosByTiendaSortedByQuantity;
