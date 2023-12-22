import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class LoginComponentForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            UserName: ['', [Validators.required]],
            Password: ['', [Validators.required]]
        })
    }

}