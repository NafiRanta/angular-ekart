import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[disableProduct]'
})
export class DisableProductDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @Input('disableProduct') set disableProduct(condition: boolean) {
    if (condition) {
      this.renderer.addClass(this.element.nativeElement, 'disble-out-of-stock-product');
    } 
  }
}
