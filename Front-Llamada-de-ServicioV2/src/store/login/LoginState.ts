export type LoginState = {
    error: string | null,
    isLoggedIn: boolean,
    token: string | null,
    rol: any,
    user: string | null,
    offices: Offices[] | []
    officeSelected: Offices | null,
    asigneeCode: number | null,
    ptiCode: any
}

export type Offices = {
    BPLId: number,
    BPLName: string,
    U_NAME: string,
    AliasName: string
}