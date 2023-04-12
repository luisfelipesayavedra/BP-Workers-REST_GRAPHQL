export interface ItemsPurchase {
  uuid?: string,
  concepto: string;
  cantidad: number;
  costo: number;
  Bodega: any;
  descuento: string;
  impuesto: string;
  total: number;
}

export interface PurchaseInvoice {
  Número_de_Factura: any;
  Consecutivo_Interno: any;
  Proveedor: any;
  Fecha_de_creación: any;
  Vencimiento: any;
  Total: any;
  Por_Pagar: any;
  Adjunto_1: any;
  Valor_recibido: any;
  Primer_Subtotal: any;
  Descuento_Total: any;
  Segundo_Subtotal: any;
  Impuestos: any;
  items: ItemsPurchase[];
}

export function transformJSON(json: any[]): PurchaseInvoice[] {
  const result: PurchaseInvoice[] = [];
  const facturas: { [key: string]: PurchaseInvoice } = {};

  json.forEach((row) => {
    const facturaId = row["Número de Factura"];

    if (!facturas[facturaId]) {
      facturas[facturaId] = {
        Número_de_Factura: row["Número de Factura"],
        Consecutivo_Interno: row["Consecutivo Interno"],
        Proveedor: row["Proveedor"],
        Fecha_de_creación: row["Fecha de creación"],
        Vencimiento: row["Vencimiento"],
        Total: row["Total"],
        Por_Pagar: row["Por Pagar"],
        Adjunto_1: row["Adjunto 1"],
        Valor_recibido: row["Valor recibido"],
        Primer_Subtotal: row["Primer Subtotal"],
        Descuento_Total: row["Descuento Total"],
        Segundo_Subtotal: row["Segundo Subtotal"],
        Impuestos: row["Impuestos"],
        items: [],
      };
    }

    facturas[facturaId].items.push({
      Bodega: row["Bodega"],
      concepto: row["Concepto Del Item"],
      cantidad: Number(row["Cantidad Del Item"]),
      costo: Number(row["Costo Del Item"]),
      descuento: row["Descuento Del Item"],
      impuesto: row["Impuesto Del Item"],
      total: Number(row["Total Del Item"]),
    });
  });

  Object.keys(facturas).forEach((key) => result.push(facturas[key]));

  return result;
}
