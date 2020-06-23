import { Product } from './../models/product';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { Subscription } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{

  products:any[] = [];
  filteredProducts:any[] = [];
  subscription: Subscription;
  cart:any;

  categories$;
  category:string;

  constructor(productService: ProductService,
              categoryService:CategoryService,
              route:ActivatedRoute,
              private cartService:ShoppingCartService) { 

    this.subscription = productService.getAll().pipe(map((actions =>{
      console.log(actions);
      actions.forEach(action =>{
        this.products.push({ key:action.key, value:action.payload.val() });

        this.filteredProducts.push({ key:action.key, value:action.payload.val() });
      })
      route.queryParamMap.subscribe(params =>{
        this.category = params.get('category');
        this.filter(this.category);
      });

    }))).subscribe();

    this.categories$ = categoryService.getCategories();
  }

  filter(category){
    this.filteredProducts = (category)?
      this.products.filter(p => p.value.category.toLowerCase() === category.toLowerCase()):
      this.products;
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  async ngOnInit(){
    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
