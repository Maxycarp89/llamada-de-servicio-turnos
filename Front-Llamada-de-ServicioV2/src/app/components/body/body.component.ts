import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() collapsed = true;
  @Input() screenWidth = 0;
  pageTitle: string = '';

  constructor(
    private router: Router,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitleFromRoute(this.router.routerState, this.router.routerState.root).join(' - ');
        this.pageTitle = title;
      }
    });

    this.titleService.getPageTitle().subscribe(title => {
      this.pageTitle = title;
    });

    if (window.innerWidth <= 1024) {
      this.collapsed = false;
    }
  }

  private getTitleFromRoute(state: any, parent: any): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitleFromRoute(state, state.firstChild(parent)));
    }
    return data;
  }

  getBodyClass(): string {
    let bodyStyleClass = '';

    if (!this.collapsed && this.screenWidth > 1024) {
      bodyStyleClass = 'body-trimmed';
    }
    if (this.collapsed && this.screenWidth <= 1024 && this.screenWidth > 0) {
      bodyStyleClass = 'body-md-screen';
    }
    if (!this.collapsed && this.screenWidth <= 1024 && this.screenWidth > 0) {
      bodyStyleClass = 'body-md-screen-collapsed';
    }
    if (this.collapsed && this.screenWidth > 1024 && this.screenWidth <= 1440) {
      bodyStyleClass = 'body-lg-screen';
    }
    if (!this.collapsed && this.screenWidth > 1024 && this.screenWidth <= 1440) {
      bodyStyleClass = 'body-lg-screen-collapsed';
    }
    return bodyStyleClass;
  }

  getTitleClass(): string {
    let titleStyleClass = '';
    if (!this.collapsed && this.screenWidth > 1024) {
      titleStyleClass = 'body-title-trimmed';
    }
    if (this.collapsed && this.screenWidth <= 1024 && this.screenWidth > 0) {
      titleStyleClass = 'body-title-md-screen';
    }
    if (!this.collapsed && this.screenWidth <= 1024 && this.screenWidth > 0) {
      titleStyleClass = 'body-title-md-screen-collapsed';
    }
    if (this.collapsed && this.screenWidth > 1024 && this.screenWidth <= 1440) {
      titleStyleClass = 'body-title-lg-screen';
    }
    if (!this.collapsed && this.screenWidth > 1024 && this.screenWidth <= 1440) {
      titleStyleClass = 'body-title-lg-screen-collapsed';
    }
    return titleStyleClass;
  }


}
