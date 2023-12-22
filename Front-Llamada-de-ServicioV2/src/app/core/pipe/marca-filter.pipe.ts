import { Pipe, PipeTransform } from "@angular/core";
import { Marcas } from "src/store/bikes/BikeState";

@Pipe({
    name: 'marcaFilter'
})

export class SearchMarcaPipe implements PipeTransform {
    
    transform(value: Marcas[], ...args: string[]) {
        if (!!args[0] === false) {
            return value
        }
        const filtered = value.filter((val: any) => {
            let result = (val.Name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1) ||
                (val.Code.toLowerCase().indexOf(args[0].toLowerCase()) !== -1)
            return result
        })
        return filtered
    }
}