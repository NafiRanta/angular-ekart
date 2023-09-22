import { Directive, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

@Directive( {
    selector: '[setBackground]'
    })
export class SetBackgroundDirective implements OnInit{
   // @Input('setBackground') backColor: string = '#36454F';
    //@Input() textColor: string = 'white';

    @Input('setBackground') changeTextAndBackColor: {backColor: string, textColor: string} 
    constructor(private element: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        //this.element.nativeElement.style.backgroundColor = '#36454F';
        //this.element.nativeElement.style.color = '#fff';
        this.renderer.setStyle(this.element.nativeElement, 'background-color', this.changeTextAndBackColor.backColor);
        this.renderer.setStyle(this.element.nativeElement, 'color', this.changeTextAndBackColor.textColor);
    }
}