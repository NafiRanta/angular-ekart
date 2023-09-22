
## Data Binding
- String Interpolation {{}} --> One way data binding (from component to view)
- Property Binding [] --> One way data binding (from component to view)
    - attributes like Disabled, Hidden, Checked doesnt work with String interpolation
    use [] or bind-value, bind-disabled, [] is more common
    property vs attributes <input [value]="name" [attr.aria-hidden]="">
    -attribute represents the initial value of the html element attribute and does not change
    -property represents the current state of the html element and can change
- Event Binding () --> One way data binding (from view to component)
- Two way data binding [()] --> Two way data binding (ngModel)


## Directives
- Directives are instructions in the DOM
- Structural directives - change the structure of the DOM
    - *ngIf
    - *ngFor
    - *ngSwitch
- Attribute directives - change the appearance or behavior of an element, component, or another directive
    - ngClass
    - ngStyle
    - ngModel
- Component directives - directives with a template
    - ngComponentOutlet

// false, '', undefined, null, 0 are falsy values
// true, ' ', 1, 2, 'a', 'false' are truthy values

## Template Reference:
- e.g. <input #email type="email" required>

## ViewChild Decorator
- used to query and get a reference to a DOM element in the component. 
- it returns the first element that matches the selector
- @ViewChild('email') email: ElementRef;
- this.email.nativeElement.value();


## creating reference to component

## @ViewChild('serverContentInput') serverContentInput: ElementRef;
- pass from component view template to component class

## @ViewChildren
- used to query and get a reference to a DOM element in the component.
- @ViewChildren('inputElement') inputElements: QueryList(ElementRef);
- inputElements will return a QueryList of all the elements that match the selector
- this.inputElements.forEach((element) => {
    element.nativeElement.value = '';
  });

vs @ContentChild() - will return the first matching element
- use @ContentChild() to get access to the content of a child component from the parent component
- can use @ViewChild to access content from the parent component

## @ContentChildren()
@ContentChildren('para') paraElements: QueryList(ElementRef);
- inputElements will return a QueryList of all the elements that match the selector
this.paraElements.forEach((element) => {
    element.nativeElement.value = '';
  });

## ngOnInit: lifecycle hook
- called after the constructor and called after the first ngOnChanges
- called once the component is initialized

## ng-Template
- an agular element and can use it like any other element
- it is not rendered in the DOM and is used to render HTML content that is not visible
- reason why is because it is just a template. it is our job to tell angular where and when to render/display it
- ngTemplateOutlet is a structural directive that renders the content of a template

example:
<ng-template #noServer>
    <p>No server was created!</p>
</ng-template>

## ng-Container
<ng-container *ngTemplateOutlet="noServer"></ng-container>
- use together with ng-template to render the content of a template
- main use of ng-container is to group elements together without creating an extra element in the DOM
- especially when using structural directives like *ngIf, *ngFor, *ngSwitch, multiple structural directives cannot be applied to the same element
example:
<ng-template "mytemplate">
    <p>No server was created!</p>
</ng-template>

<ng-container *ngTemplateOutlet="mytemplate"></ng-container>

## ng-content
- because of the shadow DOM, the content of a component when used as a selector is not rendered in the DOM
- ng-content is used to render the content of a component when used as a selector

example:
    <featured-brands>
        <h3 class="title">New Arrivals in Nike</h3>
    </featured-brands>
    <featured-brands>
        <h3 class="title">New Arrivals in Adidas</h3>
    </featured-brands>
    <featured-brands>
        <h3 class="title">New Arrivals in Reebok</h3>
    </featured-brands>
// in the component
    <div class="ekart-featured-product-item">
        <ng-content></ng-content>
        <p class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus,
        </p>
        <button class="call-to-action">Learn More</button>
    </div>



## Component Initialisation
- When Angular app starts, it firsts creates and renders the root component
- Then it creates and renders its children and their children forming a tree of components
- once it loads the component, it starts the process of rendering the view. 
- to do that, it needs to check the input properties, evaluate data bindings & expressions, render the projected content, etc.
- angular then also removes the component from the DOM when it is no longer needed
- and angular let us know when these events happen, using Angular lifecycle hooks

## Lifecycle Hooks
- methods tt angular invokes on a directive or a component, as it creates, changes and destroys them
- ngOnChanges - called after a bound input property changes
- ngOnInit - called once the component is initialized
- ngDoCheck - called during every change detection run
- ngAfterContentInit - called after content (ng-content) has been projected into view
- ngAfterContentChecked - called every time the projected content has been checked
- ngAfterViewInit - called after the component's view (and child views) has been initialized
- ngAfterViewChecked - called every time the view (and child views) has been checked
- ngOnDestroy - called once the component is about to be destroyed

Change detection: 
- a mechanism that updates the DOM when a component property changes  
-ex. @input property of a component changes, a DOM even happens, a timer events happens, HTTP request is made


## ngOnChanges 
- 

## ngOnInit
- none of the child components or projected contents or view are available at this point
hence any property decorated with @ViewChild/ren or @ContentChild/ren will be undefined and not available to use

## ngDoCheck
- called during every change detection run
- called after ngOnChanges and ngOnInit
- can use this hook to implement a custon change detection, whenever angular fails to detect a change
- great place to use when you want to execute some code on every change detection cycle

## ngAfterContentInit
- called after components projected content (ng-content) has been fully initialised projected into view
- angular updates the propoerties decorated with @ContentChild/ren just before the hook is raised

## Custom Attribute Directive
- create Custom Directives folder in app folder
- create example.directive.ts file

@Directive({
    selector: '[setBackgroundColor]'
})
export class exampleDirective  {
    constructor( private elementRef: ElementRef) implements OnInit {}

    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'red';
    }   
}

## Renderer2
- used to manipulate the DOM w/o directly accessing the DOM
- provides a better security than directly accessing the DOM

@Directive( {
    selector: '[setBackground]'
    })
export class SetBackgroundDirective implements OnInit{
    constructor(private element: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        //this.element.nativeElement.style.backgroundColor = '#36454F';
        //this.element.nativeElement.style.color = '#fff';
        this.renderer.setStyle(this.element.nativeElement, 'background-color', '#36454F');
        this.renderer.setStyle(this.element.nativeElement, 'color', '#fff');
    }
}

## HostListener
- listens to DOM event on the host element and reacts to that event by executing an event handler method
- example: listen to mouse enter and mouse leave on ekart product card. when mouse enter, zoom in

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

## HostBinding
- allows us to bind to properties of the host element (button element in this case)
- example: change the background color of the button when mouse enter and mouse leave

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

Property Binding vs HostBinding
- Property Binding: [style.backgroundColor] = 'backgroundColor'
- HostBinding: @HostBinding('style.backgroundColor') backgroundColor: string = '#282828';
