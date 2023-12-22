import { AppState } from "./AppState";

export const AppInitialState: AppState = {
    core: {
        failMsgHistory: null,
        historyService: [],
        errorRespMsg: null,
        respMsg: null,
        customer: [],
        options: ['Sí', 'No'],
        combustibleOption: [{
            value: "10",
            name: "MÍNIMO"
        }, {
            value: "25",
            name: "1/4 TANQUE"
        }, {
            value: "50",
            name: "1/3 TANQUE"
        }, {
            value: "75",
            name: "3/4 TANQUE"
        }, {
            value: "100",
            name: "MÁXIMO"
        }],
        statusCall: [
            {
                name: 'Abierto',
                value: -3
            },
            {
                name: 'Cerrada',
                value: -1
            },
            {
                name: 'Pendiente',
                value: -2
            },
            {
                name: "En Proceso",
                value: 2
            }
        ],
        priority: [
            {
                name: 'Baja',
                value: 'scp_Low'
            },
            {
                name: 'Media',
                value: 'scp_Medium'
            },
            {
                name: 'Alta',
                value: 'scp_High'
            }
        ],
        origins: [],
        problemType: [],
        subProblemType: [],
        callTypes: [],
        employees: [],
        warranty: [
            { value: "ST", name: "Sin Tratar" },
            { value: "SI", name: "Solicitud Incompleta" },
            { value: "AP", name: "Aprobado" },
            { value: "PA", name: "Pendiente de Arribo a Taller" },
            { value: "EP", name: "Entrega Parcial" },
            { value: "PR", name: "Piezas Recibidas" },
            { value: "RP", name: "Reparado" },
            { value: "RC", name: "Rechazado" }
        ]
    },
    loading: {
        show: false
    },
    login: {
        error: null,
        isLoggedIn: false,
        user: null,
        token: null,
        rol: [],
        offices: [],
        officeSelected: null,
        asigneeCode: null,
        ptiCode: null
    },
    motos: {
        error: null,
        motos: [],
        customer: [],
        respMsg: null,
        combos: [],
        errorRespMsg: null,
        historyService: [],
        failMsgHistory: null,
        motorbikeByBrandAndModel: [],
        itemsFromOperations: [],
        itemsExistInService: []
    },
    motoInterno: {
        motos: [],
        errorMsg: null,
        historyIntr: [],
        historyErrorMsg: null,
        itemsFromOperations: [],
        itemsExistInService: []
    },
    bikes: {
        bikes: [],
        errorRespMsg: null,
        error: null,
        errorMsgHistory: null,
        bikesSearched: [],
        historyService: [],
        itemsFromOperations: [],
        itemsExistInService: [],
        combos: [],
        marcas: [],
        showMarcas: false
    },
    dashboard: {
        history: []
    },
    hogar: {
        error: null,
        homeAppliance: [],
        errorRespMsg: null,
        historyService: [],
        secondWarehouse: [],
        items: [],
        itemsExistInService: []
    },
    garantia: {
        error: null,
        motos: [],
        respMsg: null,
        warrantyHistory: [],
        transfer: [],
        itemsFromOperations: [],
        itemsExistInService: [],
        items: [],
        series: [],
        secondWarehouse:[]
    }
}