import { Product } from './../../models/product';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products:any[] = [];
  filteredProducts:any[] = [];

  subscription: Subscription;


  // https://stackoverflow.com/questions/46587495/angularfire2-realtime-database-how-to-get-key-and-value
  constructor(private productService: ProductService) { 

      this.subscription = productService.getAll().pipe(map((actions =>{
      console.log(actions);
      actions.forEach(action =>{
        this.products.push({ key:action.key, value:action.payload.val() });

        this.filteredProducts.push({ key:action.key, value:action.payload.val() });
      })

    }))).subscribe();
  }

  filter(query: string){
    console.log(query);
    this.filteredProducts = (query)? 
    this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
