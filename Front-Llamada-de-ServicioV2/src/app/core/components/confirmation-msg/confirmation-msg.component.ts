import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirmation-msg',
  templateUrl: './confirmation-msg.component.html',
  styleUrls: ['./confirmation-msg.component.scss']
})

export class ConfirmationMsgComponent {
  public onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title!: string
  @Input() sales!: any

  constructor(public activeModal: NgbActiveModal) {
  }

  confirm() {
    this.activeModal.close(true);
  }

  cancel() {
    this.activeModal.dismiss(false);
  }

}