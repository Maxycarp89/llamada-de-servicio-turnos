import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {

  @Input() message!: string;
  @Input() error!: string;
  @Input() field!: FormGroup;

  constructor() { }

  ngOnInit() {}

  shouldShowComponent() {

    if (this.field?.touched && this.field?.errors?.[this.error]){
      return true;
    }
    return false;
    
  }

}
