export interface Products {
    Tipo: any,
    Item_inventariable: any,
    Item_con_variantes: any,
    Venta_en_negativo: any,
    Nombre: any,
    Codigo_del_producto_o_servicio: any,   
    Referencia: any,
    Img: any,
    Unidad_de_medida: any,
    Categoría: any,
    Descripción: any,
    Costo_inicial: any,
    Precio_base: any,
    Impuesto: any,
    Precio_total: any,
    Precio_General: any,
    // "Código cuenta contable": any,
    // "Cuenta contable": any,
    // "Código cuenta de inventario": any,
    // "Cuenta de inventario": any,
    // "Código cuenta de costo de venta": any,
    // "Cuenta de costo de venta": any,
    // "Código de barras": any,
    Subcategoria: any,
    Marca: any
}

export const productDataParsed = (data: any[]) => {
  const listItems = []
  try {
      for (const index in data) {
          const structure: Products = {
              Tipo: data[index]["Tipo"],
              Item_inventariable: data[index]["Ítem inventariable"],
              Item_con_variantes: data[index]["Ítem con variantes"],
              Venta_en_negativo: data[index]["Venta en negativo"],
              Nombre: data[index]["Nombre"],
              Codigo_del_producto_o_servicio: data[index]["Código_del_producto_o_servicio"],
              Referencia: data[index]["Referencia"],
              Img: data[index]["Img"],
              Unidad_de_medida: data[index]["Unidad de medida"],
              Categoría: data[index]["Categoría"],
              Descripción: data[index]["Descripción"],
              Costo_inicial: data[index]["Costo inicial"],
              Precio_base: data[index]["Precio base"],
              Impuesto: data[index]["Impuesto"],
              Precio_total: data[index]["Precio total"],
              Precio_General: data[index]["Precio: General"],
              Subcategoria: data[index]["Subcategoria"],
              Marca: data[index]["Marca"]
          }  
          listItems.push(structure)
      }
      return listItems
  } catch (error) {
      throw error
  }
}