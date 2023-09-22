import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective  {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') 
  OnMouseEnter() {
    // zoom in 
    this.renderer.addClass(this.element.nativeElement, 'highlight-product');
  }

  @HostListener('mouseleave')
  OnMouseOut(){
    // zoom out
    this.renderer.removeClass(this.element.nativeElement, 'highlight-product');
  }

}
