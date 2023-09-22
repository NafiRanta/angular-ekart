import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class AppHoverDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostBinding('style.backgroundColor') backgroundColor: string = '#282828';
  @HostBinding('style.border') border: string = '#282828 2px solid';
  @HostBinding('style.color') textColor: string = 'white';

  @HostListener('mouseenter') 
  OnMouseEnter() {
    this.backgroundColor = 'white';
    this.border = '#282828 3px solid';
    this.textColor = '#282828';
  }

  @HostListener('mouseleave')
  OnMouseOut(){
    this.backgroundColor = '#282828';
    this.border = '#282828 2px solid';
    this.textColor = 'white';
  }
  
}
