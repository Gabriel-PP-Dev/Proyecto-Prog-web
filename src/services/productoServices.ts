import { AppDataSource } from '../data-source';
import { Producto } from '../entities/Producto';
import { Tienda } from '../entities/Tienda';
import { Producto_Precio } from '../entities/Producto_Precio';
import { removeAccents } from "../helpers/AuxiliarFunctions";
import { TiendaProductoPrecio } from '../entities/TiendaProductoPrecio';
import { Venta } from '../entities/Venta';

// Obtener todos los productos
export const getAllProductos = async (): Promise<Producto[]> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.find({
        relations: {
          producto_precios: true,
        },
    });
};

//obtener 10 prductos más vendidos
  export const getTop10ProductosMasVendidos = async (): Promise<Producto[]> => {
    const productoRepository = AppDataSource.getRepository(Producto);

    const topProductos = await productoRepository.createQueryBuilder("producto")
        .leftJoin("producto.producto_precios", "producto_precio")
        .leftJoin("producto_precio.tiendaProductoPrecios", "tienda_producto_precio")
        .leftJoin("tienda_producto_precio.ventas", "venta")
        .select(["producto.id_producto", "producto.nombre", "SUM(venta.cantidad) as totalVentas"])
        .groupBy("producto.id_producto")
        .orderBy("totalVentas", "DESC")
        .take(10)
        .getRawMany();

    return topProductos;
};
    

// Agregar un nuevo producto
export const addProducto = async (productoData: Partial<Producto> & { precio: number }): Promise<Producto| null> => {
    if ((await getProductosByName(String(productoData.nombre))).length == 0) {
        const productoRepository = AppDataSource.getRepository(Producto);
        const precioRepository = AppDataSource.getRepository(Producto_Precio);

        // Crear un nuevo producto
        const newProducto = productoRepository.create(productoData);
        await productoRepository.save(newProducto);

        // Crear un nuevo precio asociado al producto
        const newPrecio = precioRepository.create({ precio: Number(productoData.precio), producto: newProducto });
        await precioRepository.save(newPrecio);

        // Agregar el precio recién creado al producto
        if(!newProducto.producto_precios) {
            newProducto.producto_precios = [newPrecio];
        } else {
            newProducto.producto_precios.push(newPrecio);
        }
        
        return await productoRepository.findOne({ 
            where: { nombre: productoData.nombre },
            relations: ['producto_precios'] 
        });
    }
    return null;
};


// Obtener un producto por ID
export const getProductoById = async (id: number): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.findOne({ 
        where: { id_producto: id },
        relations: ['producto_precios'] 
    });;
};


// Obtener un producto por nombre
export const getProductoByName = async (name: string): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    return await productoRepository.findOne({ 
        where: { nombre: name},
        relations: ['producto_precios'] 
    });;
};


// Actualizar un producto
export const updateProducto = async (id: number, productoData: Partial<Producto>): Promise<Producto | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    const element = await productoRepository.findOneBy({ id_producto: id });
    //si existe el producto
    if(element){
        const elementWithSameName = await getProductoByName(String(productoData.nombre))
        //si el nombre pasado es diferente al nombre existente y no existe otro elemento con ese nombre pasado como parámetro
        if((element.nombre != productoData.nombre && !elementWithSameName) || element.nombre == productoData.nombre){
            const productoRepository = AppDataSource.getRepository(Producto);
            await productoRepository.update(id, productoData);
            //devolver elemento actualizado
            return await productoRepository.findOneBy({ id_producto: id });
        }

    }
    return null;
};

//editar tienda en tiendaProductoPrecio
export const moveTiendaProductoPrecio = async (idTiendaProductoPrecio: number, idTienda:number): Promise<TiendaProductoPrecio | null> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const tiendaRepository = AppDataSource.getRepository(Tienda);

    // Buscar el registro de TiendaProductoPrecio por su ID
    const elemento = await tiendaProductoPrecioRepository.findOneBy({ id_tiendaProductoPrecio: idTiendaProductoPrecio });

    if (!elemento) {
        return null; // Devolver null si no se encuentra el registro
    }

    // Obtener la nueva tienda basada en el ID proporcionado
    const nuevaTienda = await tiendaRepository.findOneBy({ id_tienda: idTienda });

    if (!nuevaTienda) {
        return null; // Devolver null si no se encuentra la nueva tienda
    }

    // Cambiar la tienda asociada al registro de TiendaProductoPrecio
    elemento.tienda = nuevaTienda;

    // Guardar los cambios en la base de datos
    await tiendaProductoPrecioRepository.save(elemento);

    return elemento; // Devolver el registro actualizado
};

// Mover producto y precios a nueva tienda
export const moveProducto = async (idProducto: number, idNuevaTienda: number): Promise<TiendaProductoPrecio[] | null> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    
    // Buscar el producto por su ID y obtener todos los Producto_Precio asociados
    const producto = await productoRepository.findOne({ 
        where: { id_producto: idProducto },
        relations: ['producto_precios'] 
    });

    if (!producto) {
        return null; // Devolver null si no se encuentra el producto
    }

    const productosPrecio = producto.producto_precios;

    const tiendaProductoPrecioActualizados: TiendaProductoPrecio[] = [];

    for (const productoPrecio of productosPrecio) {
        // Obtener todos los registros de TiendaProductoPrecio asociados al Producto_Precio
        const tiendaProductoPrecios = await tiendaProductoPrecioRepository.find({ 
            where: { producto_precio: { id_producto_precio: productoPrecio.id_producto_precio } } 
        });

        for (const tiendaProductoPrecio of tiendaProductoPrecios) {
            // Utilizar el servicio existente para cambiar la tienda en TiendaProductoPrecio
            const tiendaProductoActualizado = await moveTiendaProductoPrecio(tiendaProductoPrecio.id_tiendaProductoPrecio, idNuevaTienda);
            
            if (tiendaProductoActualizado) {
                tiendaProductoPrecioActualizados.push(tiendaProductoActualizado);
            }
        }
    }

    return tiendaProductoPrecioActualizados;
};


// Eliminar un producto y sus registros relacionados en las entidades vinculadas
export const deleteProducto = async (id: number): Promise<boolean> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    const productoPrecioRepository = AppDataSource.getRepository(Producto_Precio);

    // Obtener el producto por su ID con todas las relaciones cargadas
    const producto = await productoRepository.findOneBy({id_producto : id});

    if (!producto) {
        return false; // Devolver false si no se encuentra el producto
    }

    const precio = await productoPrecioRepository.findOneBy({producto : producto});
    
    if (!precio){
          // Eliminar el producto en la tabla Producto
         const result = await productoRepository.delete(id);

         // Verificar que se haya eliminado al menos un registro
         return result.affected !== null && result.affected !== undefined && result.affected > 0;
    }else
    return false;//el producto tiene un precio en Producto_Precio, por lo que no se puede eliminar
};


// Obtener productos por nombre (array)
export const getProductosByName = async (name: string): Promise<Producto[]> => {
    const productoRepository = AppDataSource.getRepository(Producto);
    const normalizedName = removeAccents(name.toLowerCase()); // Normalizar el nombre buscado

    // Obtener todos los productos y filtrar en memoria
    const productos = await productoRepository.find();

    // Filtrar productos que contengan el nombre normalizado
    return productos.filter(producto => 
        removeAccents(producto.nombre.toLowerCase()).includes(normalizedName)
    );
};


// Obtener productos de Tienda (id) ordenados por cantidad 
export const getProductosByTiendaSortedByQuantity = async (id: number): Promise<TiendaProductoPrecio[]> => {
    const tiendaProductoPrecioRepository = AppDataSource.getRepository(TiendaProductoPrecio);
    const productos = await tiendaProductoPrecioRepository.find({
        where: { tienda: { id_tienda : id } }, // Filtrar por id de la tienda
        order: { cantidad_en_tienda: "ASC" }, // Ordenar por cantidad
        relations: ["tienda", "producto_precio"] // Cargar las relaciones con Tienda y Producto_Precio
    });
    return productos;
};