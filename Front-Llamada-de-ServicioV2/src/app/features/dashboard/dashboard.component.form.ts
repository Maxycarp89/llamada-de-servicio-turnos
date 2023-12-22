import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export class DashboardComponentForm {
    private formBuilder: FormBuilder

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder
    }

    createDateRangeForm(type: string): FormGroup {
        return this.formBuilder.group({
            frDate: [getLtDate("fr"), [Validators.required]],
            ltDate: [getLtDate("lt"), [Validators.required]],
            type: [type]
        })
    }
}

function getLtDate(frOrLt: string) {
    const monthsNumbers = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
    ];
    const date = new Date();
    const dateNumber = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    date.setDate(dateNumber - 20);
    if (frOrLt === "fr") {
        return `2018-01-01`;
    } else {
        return `${year}-${monthsNumbers[month]}-${dateNumber
            .toString()
            .padStart(2, "0")}`;
    }
}