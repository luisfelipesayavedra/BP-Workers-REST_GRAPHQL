export interface Items {
  uuid?: string
  ITEM_NOMBRE: any,
  ITEM_REFERENCIA: any,
  ITEM_DESCRIPCION: any,
  ITEM_CANTIDAD: any,
  ITEM_PRECIO_UNITARIO: any,
  ITEM_DESCUENTO: any,
  ITEM_IMPUESTO: any,
  ITEM_IMPUESTO_PORCENTAJE: any,
  ITEM_IMPUESTO_VALOR: any,
  ITEM_TOTAL: any,
}

export interface SellInvoice {
    FECHA_DE_EMISION: any,
    TIPO_DE_DOCUMENTO: any,
    CODIGO: any,
    TIPO_DE_FACTURA: any,
    TIPO_DE_OPERACION: any,
    ESTADO_LEGAL: any,
    ESTADO: any,
    BODEGA: any,
    CENTRO_DE_COSTO: any,
    CLIENTE_NOMBRE: any,
    CLIENTE_TIPO_DE_IDENTIFICACION_CLIENTE: any,
    IDENTIFICACION_CLIENTE: any,
    DIRECCION_CLIENTE: any,
    TELEFONO_CLIENTE: any,
    CLIENTE_CIUDAD: any,
    REMISION: any,
    ORDEN_DE_COMPRA: any,
    FORMA_DE_PAGO: any,
    PLAZO_DE_PAGO: any,
    MEDIO_DE_PAGO: any,
    VENCIMIENTO: any,
    VENDEDOR: any,
    LISTAS_DE_PRECIOS: any,
    NOTAS: any,
    SUBTOTAL_FACTURA: any,
    TOTAL_FACTURA: any,
    RETENCION_NOMBRE: any,
    RETENCION_BASE: any,
    RETENCION_VALOR: any,
    ESTADO_DE_RETENCION: any,
    RETENCION_NOMBRE_2: any,
    RETENCION_BASE_2: any,
    RETENCION_VALOR_2: any,
    ESTADO_DE_RETENCION_2: any
    items:  Items[]
}

export function transformJSON(json: any[]): SellInvoice[] {
  const result: SellInvoice[] = [];
  const facturas: { [key: string]: SellInvoice } = {};

  json.forEach((row) => {
    const facturaId = row["CÓDIGO"];

    if (!facturas[facturaId]) {
      facturas[facturaId] = {
        FECHA_DE_EMISION: row["FECHA DE EMISIÓN"],
        TIPO_DE_DOCUMENTO: row["TIPO DE DOCUMENTO"],
        CODIGO: row["CÓDIGO"],
        TIPO_DE_FACTURA: row["TIPO DE FACTURA"],
        TIPO_DE_OPERACION: row["TIPO DE OPERACIÓN"],
        ESTADO_LEGAL: row["ESTADO LEGAL"],
        ESTADO: row["ESTADO"],
        BODEGA: row["BODEGA"],
        CENTRO_DE_COSTO: row["CENTRO DE COSTO"],
        CLIENTE_NOMBRE: row["CLIENTE - NOMBRE"],
        CLIENTE_TIPO_DE_IDENTIFICACION_CLIENTE: row["CLIENTE TIPO DE IDENTIFICACIÓN CLIENTE"],
        IDENTIFICACION_CLIENTE: row["IDENTIFICACIÓN CLIENTE"],
        DIRECCION_CLIENTE: row["DIRECCIÓN CLIENTE"],
        TELEFONO_CLIENTE: row["TELÉFONO CLIENTE"],
        CLIENTE_CIUDAD: row["CLIENTE CIUDAD"],
        REMISION: row["REMISIÓN"],
        ORDEN_DE_COMPRA: row["ORDEN DE COMPRA"],
        FORMA_DE_PAGO: row["FORMA DE PAGO"],
        PLAZO_DE_PAGO: row["PLAZO DE PAGO"],
        MEDIO_DE_PAGO: row["MEDIO DE PAGO"],
        VENCIMIENTO: row["VENCIMIENTO"],
        VENDEDOR: row["VENDEDOR"],
        LISTAS_DE_PRECIOS: row["LISTAS DE PRECIOS"],
        NOTAS: row["NOTAS"],
        SUBTOTAL_FACTURA: row["SUBTOTAL FACTURA"],
        TOTAL_FACTURA: row["TOTAL FACTURA"],
        RETENCION_NOMBRE: row["RETENCIÓN NOMBRE"],
        RETENCION_BASE: row["RETENCIÓN BASE"],
        RETENCION_VALOR: row["RETENCIÓN VALOR"],
        ESTADO_DE_RETENCION: row["ESTADO DE RETENCIÓN"],
        RETENCION_NOMBRE_2: row["RETENCIÓN NOMBRE"],
        RETENCION_BASE_2: row["RETENCIÓN BASE"],
        RETENCION_VALOR_2: row["RETENCIÓN VALOR"],
        ESTADO_DE_RETENCION_2: row["ESTADO DE RETENCIÓN"],
        items: []
      };
    }

    facturas[facturaId].items.push({
      ITEM_NOMBRE: row["ÍTEM NOMBRE"],
      ITEM_REFERENCIA: row["ÍTEM REFERENCIA"],
      ITEM_DESCRIPCION: row["ÍTEM DESCRIPCIÓN"],
      ITEM_CANTIDAD: row["ÍTEM CANTIDAD"],
      ITEM_PRECIO_UNITARIO: row["ÍTEM PRECIO UNITARIO"],
      ITEM_DESCUENTO: row["ÍTEM DESCUENTO"],
      ITEM_IMPUESTO: row["ÍTEM IMPUESTO"],
      ITEM_IMPUESTO_PORCENTAJE: row["ÍTEM IMPUESTO (%)"],
      ITEM_IMPUESTO_VALOR: row["ÍTEM IMPUESTO (VALOR)"],
      ITEM_TOTAL: row["ÍTEM TOTAL"]
    });
  });

  Object.keys(facturas).forEach((key) => result.push(facturas[key]));

  return result;
}