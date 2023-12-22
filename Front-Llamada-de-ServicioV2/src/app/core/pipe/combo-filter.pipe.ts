import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'comboFilter'
})

export class ComboFilter implements PipeTransform {
    transform(value: any) {
        const filtered = value.filter((val: any) => {
            if (val.ItemCode.includes("COMBO") === false && val.OpenQty !== 0) {
                return val
            }
        })
        return filtered
    }
}