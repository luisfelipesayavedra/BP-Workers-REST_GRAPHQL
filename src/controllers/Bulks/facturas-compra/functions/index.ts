/* import { TYPE_DNI } from "../../../../../generated/client" */

export interface invoicePurchaseExcel {
  fecha_de_emision: string
  codigo: string
  estado: string
  bodega: string
  centro_de_costos: string
  ordenes_de_compra_asociadas: string
  nombre_proveedor: string
  tipo_de_identificacion_proveedor: string
  identificacion_proveedor: string
  direccion_proveedor: string
  telefono_proveedor: string
  ciudad_proveedor: string
  vencimiento: string
  producto_nombre: string
  description: string
  producto_referencia: string
  producto_cantidad: string
  producto_precio: string
  producto_descuento: string
  producto_impuesto_concepto: string
  producto_impuesto_porcentaje: string
  producto_total_impuesto: string
  producto_total: string
  factura_subtotal: string
  factura_total: string
  factura_retencion_1: string
  factura_base_retencion_1: string
  factura_total_retencion_1: string
  factura_estado_retencion_1: string
  factura_retencion_2: string
  factura_base_retencion_2: string
  factura_total_retencion_2: string
  factura_estado_retencion_2: string
}