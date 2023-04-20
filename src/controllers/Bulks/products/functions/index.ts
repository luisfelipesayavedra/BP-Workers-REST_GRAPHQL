export interface warehouse {
    quantity: number,
    name: string,
    uuid?: string
}
export interface ProductsFromExcel {
    uuid?: string
    name: string,
   	Codigo:	number,
    sku: string,
    categories: string,
    Tipo_de_Item: string
    Unidad_de_Medida: string 
    price: string
    Impuessobre_las_ventas: string 
    Precios_Sin_Impuesto: string 
    minPrice: string
    quantity: string
    img: string
    warehouses: warehouse[] | []
}

const parseWarehouse = (data: string): warehouse[] | [] => {
    try {
        const warehouses = []
        if(!data || data === "") {
            return []
        }
        let splitbase = data.includes("|") ? data.split("|") : data;
        if(typeof splitbase !== "string") {
            for (const index in splitbase) {
                const splitter = data[parseInt(index)].split(":")
                const objectBuild = {name: String(splitter[0]), quantity: parseInt(splitter[1])} as warehouse
                warehouses.push(objectBuild)
            }
        } else if(typeof splitbase === "string"){
            const splitter = (splitbase as string).split(":")
            const objectBuild = {name: String(splitter[0]), quantity: parseInt(splitter[1])} as warehouse
            warehouses.push(objectBuild)
        }
        return warehouses as unknown as warehouse[]
    } catch (error) {
        throw error
    }
}


export const productDataParsed = (data: any[]) => {
    const listItems = []
    try {
        for (const index in data) {
            const structure: ProductsFromExcel = {
                name: data[index]["name"],
                Codigo: data[index]["Codigo"],
                sku: data[index]["sku"],
                categories: data[index]["categories"],
                Tipo_de_Item: data[index]["Tipo de Item"],
                Unidad_de_Medida: data[index]["Unidad de Medida"],
                price: data[index]["price"],
                Impuessobre_las_ventas: data[index]["Impuessobre las ventas"],
                Precios_Sin_Impuesto: data[index]["Precios Sin Impuesto"],
                minPrice: data[index]["minPrice"],
                quantity: data[index]["quantity"],
                img: data[index]["img"],
                warehouses: parseWarehouse(data[index]["warehouses"])
            }  
            listItems.push(structure)
        }
        return listItems
    } catch (error) {
        throw error
    }
}