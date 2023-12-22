import { Service } from "src/app/pages/motos/model/Service";
import { CallType, Employees, Origin, Priority, ProblemType, StatusCall, SubProblemType } from "src/app/core/model/CoreTypes";

export type CoreState = {
    failMsgHistory: string | null,
    respMsg: string | null,
    errorRespMsg: string | null,
    historyService: Service[],
    options: string[],
    customer: any,
    combustibleOption: Combustible[]
    statusCall: StatusCall[]
    priority: Priority[],
    origins: Origin[],
    problemType: ProblemType[],
    subProblemType: SubProblemType[],
    callTypes: CallType[],
    employees: Employees[],
    warranty: { value: string, name: string }[]
}

type Combustible = {
    value: string,
    name: string
}