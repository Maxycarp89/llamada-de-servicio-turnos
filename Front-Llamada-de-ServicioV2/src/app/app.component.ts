import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from "@ngrx/store"
import { AppState } from 'src/store/AppState';
import { LoginState } from 'src/store/login/LoginState';
import { relogin } from 'src/store/login/login.action';

interface SideMenuToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Llamada-de-ServicioV2';

  isSideMenuCollapsed = true;
  screenWidth = 0;
  isLoggedIn: boolean = false;
  isLoggedIn$!: Observable<LoginState>;
  userName!: string;
  token!: string

  constructor(private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.pipe(select(state => state.login));
  }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe(state => {
      this.isLoggedIn = state.isLoggedIn;
      this.userName = state.user
      this.token = state.token
    });
    this.screenWidth = window.innerWidth;
    this.relogin()
  }

  onToggleSideMenu(data: SideMenuToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideMenuCollapsed = data.collapsed;
  }

  relogin() {
    if (this.token !== null) {
      this.store.dispatch(relogin({ UserName: this.userName }))
    }
    setTimeout(() => {
      this.relogin()
    }, 140000);
  }

}
