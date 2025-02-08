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
        const precioRepository = data_source_1.AppDataSource.getRepository(Producto_Precio_1.Producto_Precio);
        // Crear un nuevo producto
        const newProducto = productoRepository.create(productoData);
        yield productoRepository.save(newProducto);
        // Crear un nuevo precio asociado al producto
        const newPrecio = precioRepository.create({ precio: productoData.precio });
        newPrecio.producto = newProducto; // Establecer la relación con el producto
        yield precioRepository.save(newPrecio);
        // Agregar el precio recién creado al producto
        if (!newProducto.producto_precios) {
            newProducto.producto_precios = [newPrecio];
        }
        else {
            newProducto.producto_precios.push(newPrecio);
        }
        return newProducto.producto_precios; // Devolver el producto recién creado
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
    const element = yield productoRepository.findOneBy({ id_producto: id });
    //si existe el producto
    if (element) {
        const elementWithSameName = yield (0, exports.getProductoByName)(String(productoData.nombre));
        //si el nombre pasado es diferente al nombre existente y no existe otro elemento con ese nombre pasado como parámetro
        if ((element.nombre != productoData.nombre && !elementWithSameName) || element.nombre == productoData.nombre) {
            const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
            yield productoRepository.update(id, productoData);
            //devolver elemento actualizado
            return yield productoRepository.findOneBy({ id_producto: id });
        }
    }
    return null;
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
// Mover producto y precios a nueva tienda
const moveProducto = (idProducto, idNuevaTienda) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRepository = data_source_1.AppDataSource.getRepository(Producto_1.Producto);
    const tiendaProductoPrecioRepository = data_source_1.AppDataSource.getRepository(TiendaProductoPrecio_1.TiendaProductoPrecio);
    // Buscar el producto por su ID y obtener todos los Producto_Precio asociados
    const producto = yield productoRepository.findOne({
        where: { id_producto: idProducto },
        relations: ['producto_precios']
    });
    if (!producto) {
        return null; // Devolver null si no se encuentra el producto
    }
    const productosPrecio = producto.producto_precios;
    const tiendaProductoPrecioActualizados = [];
    for (const productoPrecio of productosPrecio) {
        // Obtener todos los registros de TiendaProductoPrecio asociados al Producto_Precio
        const tiendaProductoPrecios = yield tiendaProductoPrecioRepository.find({
            where: { producto_precio: { id_producto_precio: productoPrecio.id_producto_precio } }
        });
        for (const tiendaProductoPrecio of tiendaProductoPrecios) {
            // Utilizar el servicio existente para cambiar la tienda en TiendaProductoPrecio
            const tiendaProductoActualizado = yield (0, exports.moveTiendaProductoPrecio)(tiendaProductoPrecio.id_tiendaProductoPrecio, idNuevaTienda);
            if (tiendaProductoActualizado) {
                tiendaProductoPrecioActualizados.push(tiendaProductoActualizado);
            }
        }
    }
    return tiendaProductoPrecioActualizados;
});
exports.moveProducto = moveProducto;
// Eliminar un producto y sus registros relacionados en las entidades vinculadas
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
