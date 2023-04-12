export interface Item {
  uuid?: string
  concepto: string;
  cantidad: number;
  costo: number;
  Bodega: any;
  descuento: string;
  impuesto: string;
  total: number;
}

export interface SellInvoice {
   Valor_Total: any,
   Retenido: any,
   Notas_Credito: any,
   Cobrado: any,
   Por_Cobrar: any,
   Numero_de_Factura: any,
   Status_de_la_Factura: any,
   Nombre_de_Cliente: any,
   Fecha_de_Creacion: any,
   Numero_de_Identificacion: any,
   Consecutivo_Interno: any
   Fecha_de_Vencimiento: any,
   Telefono: any,
   Plazo_de_Pago: any,
   Subtotal: any,
   Valor_de_Descuento: any,
   Subtotal_Con_Descuento: any,
   Valor_de_IVA: any,
   Total: any,
   Forma_de_Pago: any,
   Medio_de_Pago: any,
   Vendedor: any,
   Lista_de_Precios: any,
   Bodega: any,
   Centro_de_Costos: any,
   Url_Factura_PDF: any,
   Url_XML_Factura_DIAN: any
  items: Item[];
}

export function transformJSON(json: any[]): SellInvoice[] {
  const result: SellInvoice[] = [];
  const facturas: { [key: string]: SellInvoice } = {};

  json.forEach((row) => {
    const facturaId = row["Numero de Factura"];

    if (!facturas[facturaId]) {
      facturas[facturaId] = {
        Valor_Total: row["Valor Total"],
        Retenido: row["Retenido"],
        Notas_Credito: row["Notas Credito"],
        Cobrado: row["Cobrado"],
        Por_Cobrar: row["Por Cobrar"],
        Numero_de_Factura: row["Numero de Factura"],
        Status_de_la_Factura: row["Status de la Factura"],
        Nombre_de_Cliente: row["Nombre de Cliente"],
        Fecha_de_Creacion: row["Fecha de Creacion"],
        Numero_de_Identificacion: row["Numero de Identificacion"],
        Consecutivo_Interno: row["Numero de Factura"],
        Fecha_de_Vencimiento: row["Fecha de Vencimiento"],
        Telefono: row["Telefono"],
        Plazo_de_Pago: row["Plazo de Pago"],
        Subtotal: row["Subtotal"],
        Valor_de_Descuento: row["Valor de Descuento"],
        Subtotal_Con_Descuento: row["Subtotal Con Descuento"],
        Valor_de_IVA: row["Valor de IVA"],
        Total: row["Total"],
        Forma_de_Pago: row["Forma de Pago"],
        Medio_de_Pago: row["Medio de Pago"],
        Vendedor: row["Vendedor"],
        Lista_de_Precios: row["Lista de Precios"],
        Bodega: row["Bodega"],
        Centro_de_Costos: row["Centro de Costos"],
        Url_Factura_PDF: row["Url Factura PDF"],
        Url_XML_Factura_DIAN: row["Url XML Factura DIAN"],
        items: [],
      };
    }

    facturas[facturaId].items.push({
      Bodega: row["Bodega"],
      concepto: row["Item Producto"],
      cantidad: Number(row["Cantidad Producto"]),
      costo: Number(row["Total Producto"]),
      descuento: row["Descuento % (Producto)"],
      impuesto: row["Impuesto Producto"],
      total: Number(row["Total Del Item"]),
    });
  });

  Object.keys(facturas).forEach((key) => result.push(facturas[key]));

  return result;
}
