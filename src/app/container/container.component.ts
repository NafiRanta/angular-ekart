import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
 listOfString: string[] = ['Nafi', 'Ashley', 'Jacob', 'Gin', 'Anton'];

 searchText: string = '';

 // creating reference of productListComponent 
 @ViewChild(ProductListComponent) productListComponent: ProductListComponent;

 setSearchText(value: string){
    this.searchText = value;
 }
}
