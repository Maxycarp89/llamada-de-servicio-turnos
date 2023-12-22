import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[addParsedValue]'
})

export class ParsedDirective {

    constructor(private el: ElementRef,
        private ngControl: NgControl,
        private renderer: Renderer2) { }

    @HostListener('change') onChange() {
        const value = this.el.nativeElement.value;
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            this.renderer.setProperty(this.el.nativeElement, 'value', parsedValue);
            this.ngControl.control.setValue(parsedValue);
        }
    }
}