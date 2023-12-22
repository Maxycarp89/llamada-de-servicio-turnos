import { FormGroup } from "@angular/forms";

export const headers: string[] = ["C° de la Bici", "Nombre", "Serie", "Cuadro", "Acción"]

export function manageValidator(form: FormGroup, comboSelected: AnalyserNode) {
    const { value } = form
    if (value.ServiceCallId) {
        if (value.Status === -1 && comboSelected === null &&
            value.ProblemSubType !== 96 || value.Status === -1 && comboSelected === null &&
            value.ProblemSubType !== 97) {
            return "No es posible cerrar services realizados con el tipo de problema COMBO o SERVICIOS si es que no se selecciona el combo a remitir o si es que el cliente no posee combos facturados."
        }
        if (value.Status === -1 && !!value.Resolution === false) {
            return "Recuerda cargar la resolución al cerrar el service en la sección datos de la llamada"
        }
    }
    if (!!value.BPeMail === false) {
        return "Ingresar el mail en la sección de datos básicos con el formato correcto. Ejemplo: ejemplo@gmail.com"
    }
    if (!!value.ItemCode === false && !!value.U_Marca === false) {
        return "Ingresar el código de la moto en la sección datos básicos. En caso que no posea código cargado, cargar una moto en la sección ubicada abajo"
    }
    if (!!value.ItemDescription === false&& !!value.U_Marca === false) {
        return "Ingresar la descripción de la moto en la sección datos básicos. En caso que no posea código cargado, cargar una moto en la sección ubicada abajo"
    }
    if (!!value.U_Marca === true && !!value.U_Modelo === false) {
        return "Ingresar el módelo de la bici en la sección datos básicos."
    }
    if (!!value.U_Chasis === false) {
        return "Ingresar el cuadro en la sección de datos básicos."
    }
    if (!!value.Status === false) {
        return "Ingresar el estado de la llamada en la sección de datos de la llamada."
    }
    if (!!value.Priority === false) {
        return "Ingresar el nivel de prioridad de la llamada en la sección datos de la llamada."
    }
    if (!!value.Subject === false) {
        return "Ingresar el asunto de la llamada en la sección de datos de la llamada."
    }
    if (!!value.Description === false) {
        return "Ingresar un comentario sobre la llamada en la sección datos de la llamada."
    }
    if (!!value.Origin === false) {
        return "Ingresar el origen en la sección datos de la llamada."
    }
    if (!!value.ProblemType === false) {
        return "Ingresar el tipo de problema en la sección datos de la llamada."
    }
    if (!!value.ProblemSubType === false) {
        return "Ingresar el subtipo de problema en la sección datos de la llamada."
    }
    if (!!value.CallType === false) {
        return "Ingresar el tipo de llamada en la sección datos de la llamada."
    }
    if (!!value.TechnicianCode === false) {
        return "Ingresar el técnico que llevara acabo la realización del service en la sección datos de la llamada"
    }
    if (!!value.U_Faltante === false) {
        return "Ingreasr si la bici posee o no alguna pieza faltante en la sección datos de la llamada"
    }
    if (!!value.U_Rayado === false) {
        return "Ingresar si la bici posee o no alguna rayadura en la sección datos de la llamada."
    }
    if (!!value.U_Rotura === false) {
        return "Ingresar si la bici posee o no alguna rotura en la sección datos de la llamada."
    }
    if (!!value.U_Manchado === false) {
        return "Ingresar si la bici posee o no alguna parte manchada en la sección datos de la llamada."
    }
    return ""
} 