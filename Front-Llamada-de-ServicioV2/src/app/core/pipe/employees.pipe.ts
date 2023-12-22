import { Pipe, PipeTransform } from "@angular/core";
import { Employees } from "../model/CoreTypes";

@Pipe({
    name: 'employeesFilter'
})

export class EmployeesFilter implements PipeTransform {

    transform(value: Employees[]) {
        const items = [...value]
        const lowerCaseA: (str: string) => string = (str: string) => str.toLowerCase();
        function compare(a: Employees, b: Employees) {
            return lowerCaseA(`${a.FirstName}${a.LastName}`).localeCompare(lowerCaseA(`${b.FirstName}${b.LastName}`))
        }
        return items.sort(compare)
    }
}