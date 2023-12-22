import { FormGroup } from "@angular/forms";

export function manageMsgValidator(form: FormGroup, comboSelected: any, sales: any) {
    const { value } = form
    if (value.ServiceCallID) {
        if (!value.ServiceCallActivities.length) {
            if (value.Status === -1 && sales && !sales.DocumentLines.length &&
                value.ProblemType === 34) {
                return "No es posible cerrar un servicio por tipo de problema COMBO o SERVICIOS sin imputar una salida de insumos"
            }
            if (value.Status === -1 && sales && !sales.DocumentLines.length &&
                value.ProblemType === 37) {
                return "No es posible cerrar un servicio por tipo de problema COMBO o SERVICIOS sin imputar una salida de insumos en la sección de operaciones"
            }
        }
        if (value.Status === -1 && comboSelected === null &&
            value.ProblemType === 34 || value.Status === -1 && comboSelected === null &&
            value.ProblemType === 37) {
            return "No es posible cerrar services realizados con el tipo de problema COMBO o SERVICIOS si es que no se selecciona el combo a remitir o si es que el cliente no posee combos facturados."
        }
        if (value.Status === -1 && !!value.Resolution === false) {
            return "Recuerda cargar la resolución al cerrar el service en la sección datos de la llamada"
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
    if (!!value.BPeMail === false) {
        return "Ingresar el mail en la sección de datos básicos con el formato correcto. Ejemplo: ejemplo@gmail.com"
    }
    if (!!value.Status === false) {
        return "Ingresar el estado de la llamada en la sección datos de la llamada."
    }
    if (!!value.Priority === false) {
        return "Indica el nivel de prioridad de la llamada de servicio en la sección datos de llamada"
    }
    if (value.U_Kilometraje === '') {
        return "Ingresa el kilometraje de la moto en la sección de datos de la llamada"
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
    console.log(value.ServiceCallID && !!value.Subject === true && value.Subject.toLowerCase().includes("servicio") 
    && [value.ProblemType !== 34, value.ProblemType !== 37].includes(true))
    console.log(value.ProblemType)
    console.log([value.ProblemType !== 34, value.ProblemType !== 37])
    console.log([value.ProblemType !== 34, value.ProblemType !== 37].includes(true))
    if (value.ProblemType === 26 && sales.DocumentLines.length > 0) {
        return "No es posible imputar una salida de mercancía para los services con el tipo de problema CONTROL. Quitar los items seleccionados en la sección de operaciones."
    }
    if (value.ProblemType === 26 && value.ServiceCallActivities && value.ServiceCallActivities.length > 0) {
        return "No es posible modificar el tipo de problema a CONTROL en caso de ya exista una salida de mercancía asociada a la realización del service. Modificar el tipo de problema al tipo correspondiente en la sección datos de la llamada."
    }
    if (value.ServiceCallID && !!value.Subject === true && value.Subject.toLowerCase().includes("combo") && [value.ProblemType !== 34].includes(true)) {
        return "Recuerda cambiar el tipo de problema a COMBOS en caso de que quieras remitir un combo o un servicio al cerrar el service en la sección datos de la llamada"
    }
    if (value.ServiceCallID && !!value.Description === true && value.Description.toLowerCase().includes("combo") && [value.ProblemType !== 34].includes(true)) {
        return "Recuerda cambiar el tipo de problema a COMBOS en caso de que quieras remitir un combo o un servicio al cerrar el service en la sección datos de la llamada"
    }
    if (value.ServiceCallID && !!value.Resolution === true && value.Resolution.toLowerCase().includes("combo") && [value.ProblemType !== 34].includes(true)) {
        return "Recuerda cambiar el tipo de problema a COMBOS en caso de que quieras remitir un combo o un servicio al cerrar el service en la sección datos de la llamada"
    }
    if (value.ServiceCallID && !!value.Subject === true && value.Subject.toLowerCase().includes("servicio") && [value.ProblemType !== 37].includes(true)) {
        return "Recuerda cambiar el tipo de problema a SERVICIOS en caso de que quieras remitir un combo o un servicio al cerrar el service. En caso de que quieras cerrar el service y no sea por uno de estos tipos de problemas, borra la palabra Servicio en el asunto dentro de la sección de datos de la llamada"
    }
    if (value.ServiceCallID && !!value.Description === true && value.Description.toLowerCase().includes("servicio") && [value.ProblemType !== 37].includes(true)) {
        return "Recuerda cambiar el tipo de problema a SERVICIOS en caso de que quieras remitir un combo o un servicio al cerrar el service. En caso de que quieras cerrar el service y no sea por uno de estos tipos de problemas, borra la palabra Servicio en el comentario dentro de la sección de datos de la llamada"
    }
    if (value.ServiceCallID && !!value.Resolution === true && value.Resolution.toLowerCase().includes("servicio") && [value.ProblemType !== 37].includes(true)) {
        return "Recuerda cambiar el tipo de problema a SERVICIOS en caso de que quieras remitir un combo o un servicio al cerrar el service. En caso de que quieras cerrar el service y no sea por uno de estos tipos de problemas, borra la palabra Servicio en la resolución dentro de la sección de datos de la llamada"
    }
    if (!!value.CallType === false) {
        return "Ingresar el tipo de llamada en la sección datos de la llamada"
    }
    if (value.ServiceCallID && !!value.TechnicianCode === false) {
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
    if (!!value.U_Nivel_Combustible === false) {
        return "Ingresar el nivel de combustible en la sección datos de la llamada"
    }
    return ""
}