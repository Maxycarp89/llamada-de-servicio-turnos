import { FormGroup } from "@angular/forms";

export function manageHomeMsgValidator(form: FormGroup, transferForm: FormGroup): string {
    const { value } = form
    if (transferForm.value.StockTransferLines.length > 0) {
        if (!!transferForm.value.CardCode === false) return "Recuerda enviar todos los datos del socio de negocios en la transferencia."
        else if (!!transferForm.value.ToWarehouse === false) return "Recuerda enviar el almacén destino para realizar la transferencia."
    }
    if (value.ServiceCallID) {
        if (value.Status === -1 && !!value.Resolution === false) {
            return "Recuerda cargar la resolución al cerrar el service en la sección datos de la llamada"
        }
    }
    if (!!value.Status === false) {
        return "Ingresar el estado de la llamada en la sección datos de la llamada."
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
    if (value.ServiceCallID && !!value.TechnicianCode === false) {
        return "Indica el técnico que va a realizar el service en la sección datos de la llamada"
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