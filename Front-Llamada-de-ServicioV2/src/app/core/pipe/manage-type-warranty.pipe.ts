import { Pipe, PipeTransform } from "@angular/core";
import { Service } from "../model/CoreTypes";

@Pipe({
    name: 'warrantyType'
})

export class WarrantyTypeFilter implements PipeTransform {

    constructor() { }

    transform(value: Service[], ...args: string[]) {
        if (args[0] === '') return value
        const filtered = value.filter((val: Service) => val.U_EstadoGrtia === args[0])
        return filtered
    }
}