import { FormGroup } from "@angular/forms";

export const headers: string[] = ["Código", "Nombre", "Chasis", "Motor", "Serie", "Acción"]

export function manageValidator(form: FormGroup) {
    const { value } = form
    if (value.ServiceCallID) {
        if (value.Status === -1 && !!value.Resolution === false) {
            return "No es posible cerrar un service si no se carga la resolución en datos de la llamada"
        }
    }
    if (!!value.ItemCode === false) {
        return "Ingresar el código de la moto en la sección datos básicos. En caso que no posea código cargado, cargar una moto en la sección ubicada abajo"
    }
    if (!!value.ItemDescription === false) {
        return "Ingresar la descripción de la moto en la sección datos básicos. En caso que no posea código cargado, cargar una moto en la sección ubicada abajo"
    }
    if (!!value.U_Chasis === false) {
        return "Ingresar el número de chasis en la sección de datos básicos."
    }
    if (!!value.U_Motor === false) {
        return "Ingresar el motor en la sección de datos básicos."
    }
    if (!!value.Priority === false) {
        return "Indica el nivel de prioridad de la llamada de servicio en la sección datos de llamada"
    }
    if (!!value.Subject === false) {
        return "Ingresar el asunto de la llamada en la sección datos de la llamada."
    }
    if (!!value.Description === false) {
        return "Ingresar el comentario en la sección datos de la llamada"
    }
    if (!!value.Origin === false) {
        return "Ingreasr el origen en la sección datos de la llamada"
    }
    if (!!value.ProblemType === false) {
        return "Ingresar el tipo de problema en la sección datos de la llamada."
    }
    if (!!value.ProblemSubType === false) {
        return "Ingresar el subtipo de problema en la sección datos de la llamada."
    }
    if (!!value.CallType === false) {
        return "Ingresar el tipo de llamada en la sección datos de la llamada"
    }
    if (!!value.TechnicianCode === false) {
        return "Indica el técnico que va a realizar el service en la sección datos de la llamada"
    }
    if (!!value.U_Alarma === false) {
        return "Ingresar si posee alarma o no en la seccción datos de la llamada."
    }
    if (!!value.U_Casco === false) {
        return "Ingresar si se dejo un casco en la sección datos de llamada"
    }
    if (!!value.U_Kit_Herramientas === false) {
        return "Ingresar si posee kit de herramientas en la sección datos de la llamada"
    }
    if (!!value.U_Faltante === false) {
        return "Ingresar si la moto posee alguna pieza faltan en la sección datos de la llamada"
    }
    if (!!value.U_Rayado === false) {
        return "Ingresar si la moto posee rayadura en la sección datos de la llamada"
    }
    if (!!value.U_Rotura === false) {
        return "Ingresar si la moto posee alguna rotura en la sección datos de la llamada"
    }
    if (!!value.U_Manchado === false) {
        return "Ingresar si la moto posee una manchadura en la sección datos de la llamada"
    }
    return ""
}
