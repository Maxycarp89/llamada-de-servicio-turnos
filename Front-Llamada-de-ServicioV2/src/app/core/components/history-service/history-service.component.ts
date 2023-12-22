import { Component, Input } from "@angular/core";
import { Service } from "../../model/CoreTypes";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-history-service',
    templateUrl: './history-service.component.html',
    styleUrls: ['./history-service.component.scss']
})

export class HistoryServiceComponent {
    @Input() historyService!: Service[]
    @Input() msg!: string | null

    constructor(private modalService: NgbModal) {}

    dismiss() {
        this.modalService.dismissAll()
    }
}