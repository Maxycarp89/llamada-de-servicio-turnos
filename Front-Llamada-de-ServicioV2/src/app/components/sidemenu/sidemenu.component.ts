import { Component, Output, EventEmitter, OnInit, HostListener, TemplateRef } from '@angular/core';
import { navBarData } from './nav-data';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { Observable, Subscription } from 'rxjs';
import { logout, updatePTIAndOffice } from 'src/store/login/login.action';
import { LoginState, Offices } from 'src/store/login/LoginState';
import { MatDialog } from '@angular/material/dialog';

interface SideMenuToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})

export class SidemenuComponent implements OnInit {
    @Output() onToggleSideMenu: EventEmitter<SideMenuToggle> = new EventEmitter();
    collapsed = true;
    collapsedOffice = true
    screenWidth = 0;
    navData = navBarData;
    expandedSections: { [key: string]: boolean } = {};
    login$: Observable<LoginState>;
    activeOffice!: Offices;
    activeOfficeID!: number
    rol: any
    offices!: Offices[]

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth <= 1024) {
            this.collapsed = false;
            this.onToggleSideMenu.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
        }
    }

    constructor(
        private store: Store<AppState>,
        private dialogService: MatDialog
    ) {
        this.login$ = this.store.pipe(select(state => state.login));
        this.login$.subscribe(state => {
            if (state.officeSelected && state.officeSelected.AliasName) {
                this.activeOffice = state.officeSelected
                this.activeOfficeID = state.officeSelected.BPLId
            }
            this.rol = state.rol
            this.offices = state.offices
        })
    }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
        if (window.innerWidth <= 1024) {
            this.collapsed = false;
            this.collapsedOffice = false
        }
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
        this.onToggleSideMenu.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
        this.expandedSections = {};
    }

    closeSideMenu(): void {
        this.collapsed = false;
        this.onToggleSideMenu.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
        this.expandedSections = {};
    }

    toggleSection(section: any) {
        if (section.subsections) {
            if (!this.collapsed) {
                this.toggleCollapse();
            }
            this.expandedSections[section.label] = !this.expandedSections[section.label];
        }
    }

    logout() {
        this.store.dispatch(logout());
    }


    showByRol(type: string | number) {
        if (type === 'Dashboard') return true
        if (type === 'Guia') return true
        const authorized = this.rol.filter((e: any) => e.name === type || e.position === type)
        if (authorized.length > 0) return true
        else return false;
    }

    toggleChangeOffice(dialog: TemplateRef<Component>): void {
        this.collapsedOffice = this.collapsedOffice ? false : true
        this.dialogService.open(dialog, { width: "30%" })
    }

    changeNewOffice(BPLId: number) {
        const newOfficeSelected = this.offices.filter((e: Offices) => e.BPLId === BPLId)
        this.store.dispatch(updatePTIAndOffice({ office: newOfficeSelected[0] }))
    }
}