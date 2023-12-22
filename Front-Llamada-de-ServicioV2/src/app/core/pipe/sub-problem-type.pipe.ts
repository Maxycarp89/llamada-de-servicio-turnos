import { Pipe, PipeTransform } from "@angular/core";
import { ProblemType, SubProblemType } from "../model/CoreTypes";

@Pipe({
    name: 'subProblemFilter'
})

export class SubProblemFilter implements PipeTransform {
    transform(value: SubProblemType[], ...args: any[]) {
        if (!!args[0] === false) {
            return []
        }
        const name = args[1].filter((e: ProblemType) => e.ProblemTypeID === parseInt(args[0]))
        const filtered = value.filter((val) => {
            let result = (val.Description.toLowerCase().indexOf(name[0].Name.toLowerCase()) !== -1)
            return result
        })
        return filtered
    }
}