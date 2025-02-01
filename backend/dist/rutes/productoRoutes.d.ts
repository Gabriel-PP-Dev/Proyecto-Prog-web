declare const router: import("express-serve-static-core").Router;
/**
 * Mover un producto a otra tienda
 *
 * Recibe en el parámetro :id:
 * - id (string): ID del producto
 *
 * Recibe en el body:
 * - id_tienda_origen (string): ID de la tienda de origen del producto
 * - id_tienda_destino (string): ID de la tienda a la que se moverá el producto
 * - cantidad (number): Cantidad del producto que se moverá
 *
 * Retorna:
 * - Un mensaje de confirmación de movimiento
 */
export default router;
