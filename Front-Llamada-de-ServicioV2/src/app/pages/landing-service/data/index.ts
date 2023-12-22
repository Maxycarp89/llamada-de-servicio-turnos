export const headers: string[] = ["N° Remito", "Moto", "Color", "Chasis", "Motor", "Serie", "Acción"]
export const headerService: string[] = ["C° de la Moto", "Moto", "Chasis", "Motor", "Acción"]

export const headerWithName: string[] = ["N° Remito", "C° Cliente", "Nombre", "Moto", "Color", "Chasis", "Motor", "Serie", "Acción"]

export const headerNewMotorbike: string[] = ["Código", "Nombre", "Acción"]

export const headerOperation: string[] = ["Items Encontrados", "Acción"]

export const headerItemsSelected: string[] = ["Items Seleccionados", "Cantidad", "Acción"]

export const headerItemExist: string[] = ["C° del Articulo", "Descripción", "Tipo de Unidad", "Cantidad"]

export const sales: {
    BPL_IDAssignedToInvoice: number,
    DocumentLines: any,
    GroupNumber: number,
    U_Tipo_Operacion: string
} = {
    BPL_IDAssignedToInvoice: 0,
    DocumentLines: [],
    GroupNumber: -2,
    U_Tipo_Operacion: "1",
}


export const cities: { id: string, nombre: string }[] = [
    { id: "54", nombre: "Misiones" },
    { id: "74", nombre: "San Luis" },
    { id: "70", nombre: "San Juan" },
    { id: "30", nombre: "Entre Ríos" },
    { id: "78", nombre: "Santa Cruz" },
    { id: "62", nombre: "Río Negro" },
    { id: "26", nombre: "Chubut" },
    { id: "14", nombre: "Córdoba" },
    { id: "50", nombre: "Mendoza" },
    { id: "46", nombre: "La Rioja" },
    { id: "10", nombre: "Catamarca" },
    { id: "42", nombre: "La Pampa" },
    { id: "86", nombre: "Santiago del Estero" },
    { id: "18", nombre: "Corrientes" },
    { id: "82", nombre: "Santa Fe" },
    { id: "90", nombre: "Tucumán" },
    { id: "58", nombre: "Neuquén" },
    { id: "66", nombre: "Salta" },
    { id: "22", nombre: "Chaco" },
    { id: "34", nombre: "Formosa" },
    { id: "38", nombre: "Jujuy" },
    { id: "02", nombre: "Ciudad Autónoma de Buenos Aires" },
    { id: "06", nombre: "Buenos Aires" },
    { id: "94", nombre: "Tierra del Fuego" },
];

export const options: { YESORNO: string[] } = {
    YESORNO: ['Sí', 'No']
}