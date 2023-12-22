import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appUpperCase]'
})
export class UpperCaseDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        this.el.nativeElement.value = value.toUpperCase();
    }
}