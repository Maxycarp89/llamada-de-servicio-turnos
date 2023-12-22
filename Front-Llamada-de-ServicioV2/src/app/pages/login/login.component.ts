import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginComponentForm } from './login.component.form';
import { Router } from '@angular/router';
import { Store, select } from "@ngrx/store"
import { getPTICode, login, logout, selectOffice } from 'src/store/login/login.action';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoginState, Offices } from 'src/store/login/LoginState';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    login$!: Observable<LoginState>;
    loginState!: LoginState
    loading$!: Observable<boolean>
    loading!: boolean
    officeSelected!: Offices


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private store: Store<AppState>,
        private titleService: TitleService
    ) {
        this.login$ = this.store.pipe(select(state => state.login));
        this.loading$ = this.store.pipe(select(state => state.loading.show))
        this.login$.subscribe(loginState => this.loginState = loginState);
        this.loading$.subscribe(load => this.loading = load)
    }

    ngOnInit() {
        this.loginForm = new LoginComponentForm(this.formBuilder).createForm();
        this.loginState.isLoggedIn && this.router.navigate(['/dashboard']);
    }

    login(): void {
        this.store.dispatch(login(this.loginForm.value))
    }

    selectOffice(BPLId: any) {
        this.store.dispatch(selectOffice({ BPLId: parseInt(BPLId.target.value) }))
        this.router.navigate(['dashboard']);
        this.titleService.setPageTitle('Dashboard');
        setTimeout(() => {
            this.store.dispatch(getPTICode())
        }, 200);
    }

    logoutUser() {
        this.store.dispatch(logout())
    }
}