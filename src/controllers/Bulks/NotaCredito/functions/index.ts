export interface items {
    uuid?: string
    concepto_del_item: any;
    referencia_del_item: any;
    precio_del_item: any;
    descuento_del_item: any;
    impuesto_del_item: any;
    descripcion_del_item: any;
    cantidad_del_item: any;
    total_del_item: any;
}

export interface FacturaVenta {
    numero_de_pagina_allegra: any;
    consecutivo_de_pagina: any;
    numero_de_factura: any;
    estado_ante_dian: any;
    dian: any;
    notificaciones: any;
    cude: any;
    tipo_de_nota_credito: any;
    razon: any;
    cliente: any;
    creado: any;
    por_aplicar: any;
    notas: any;
    lista_de_precios: any;
    bodega: any;
    centro_de_costo: any;
    primer_subtotal: any;
    descuento: any;
    segundo_subtotal: any;
    impuestos: any;
    total: any;
    numero_de_venta: any;
    fecha_de_la_venta: any;
    vencimiento_venta: any;
    observaciones_venta: any;
    total_venta: any;
    pagado_venta: any;
    por_pagar_venta: any;
    monto_de_venta: any;
    items: items[];
}

export function transformJSON(json: any[]): FacturaVenta[] {
    const resultado: FacturaVenta[] = [];
    const facturas: { [key: string]: FacturaVenta } = {};

    json.forEach((fila) => {
        const facturaId = fila["Número de Factura"];

        if (!facturas[facturaId]) {
            facturas[facturaId] = {
                numero_de_pagina_allegra: fila["Numero de Pagina Allegra"],
                consecutivo_de_pagina: fila["Consecutivo de Pagina"],
                numero_de_factura: fila["Número de Factura"],
                estado_ante_dian: fila["Estado ante DIAN"],
                dian: fila["DIAN"],
                notificaciones: fila["Notificaciones"],
                cude: fila["CUDE"],
                tipo_de_nota_credito: fila["Tipo De nota crédito"],
                razon: fila["Razón"],
                cliente: fila["Cliente"],
                creado: fila["Creado"],
                por_aplicar: fila["Por Aplicar"],
                notas: fila["Notas"],
                lista_de_precios: fila["Lista de precios"],
                bodega: fila["Bodega"],
                centro_de_costo: fila["Centro de Costo"],
                primer_subtotal: fila["Primer Subtotal"],
                descuento: fila["Descuento"],
                segundo_subtotal: fila["Segundo Subtotal"],
                impuestos: fila["Impuestos"],
                total: fila["Total"],
                numero_de_venta: fila["Numero de Venta"],
                fecha_de_la_venta: fila["Fecha de la Venta"],
                vencimiento_venta: fila["Vencimiento Venta"],
                observaciones_venta: fila["Observaciones Venta"],
                total_venta: fila["Total Venta"],
                pagado_venta: fila["Pagado Venta"],
                por_pagar_venta: fila["Por pagar Venta"],
                monto_de_venta: fila["Monto de Venta"],
                items: [],
            };
        }

        facturas[facturaId].items.push({
            concepto_del_item: fila["Concepto Del Item"],
            referencia_del_item: fila["Referencia Del Item"],
            precio_del_item: fila["Precio del Item"],
            descuento_del_item: fila["Descuento Del Item"],
            impuesto_del_item: fila["Impuesto Del Item"],
            descripcion_del_item: fila["Descripción Del Item"],
            cantidad_del_item: fila["Cantidad del Item"],
            total_del_item: fila["Total del Item"],
        });
    });

    Object.keys(facturas).forEach((key) => resultado.push(facturas[key]));

    return resultado;
}

