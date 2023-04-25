interface StockBodegas {
  Bodega: string;
  Cantidad: number;
}
export interface Stock {
  Titulo_del_Producto: string;
  Codigo: string;
  Referencia: string;
  Stock: string;
  Bodegas: StockBodegas[];
}

export function parseStock(data: any): Stock[] {
  const dataParsed = [];
  for (const i in data) {
    let dataBase = {
      Titulo_del_Producto: data[i]["Titulo del Producto"],
      Codigo: data[i]["Codigo"],
      Referencia: data[i]["Referencia"],
      Stock: data[i]["Stock"],
      Bodegas: JSON.parse(data[i]["Bodegas"]),
    };
    dataBase.Bodegas.forEach((item: StockBodegas) => {
      item.Cantidad = parseInt(String(item.Cantidad));
    })
    dataParsed.push(dataBase);
  }
  return dataParsed;
}
