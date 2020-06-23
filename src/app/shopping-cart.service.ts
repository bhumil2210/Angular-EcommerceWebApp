import { shoppingCart } from './models/shopping-cart';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  public async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+cartId).valueChanges();
  }

  private getItem(cartId:string,productId:string){
    return this.db.object('/shopping-cart/'+cartId+'/items/'+productId);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  async addToCart(productObject){
    let productToAdd:Product = {} as any;

    productToAdd.title = productObject.value.title;
    productToAdd.price = productObject.value.price;
    productToAdd.category = productObject.value.category;
    productToAdd.imageUrl = productObject.value.imageUrl;

    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,productObject.key);
    
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
      let quantity:number;
      let i = <shoppingCart>item;
      if(item) quantity = i.quantity;
      else quantity = 0;

      item$.update({ product:productToAdd, quantity:quantity + 1 });
    });
  }

  // public async getQuantity(productId){
  //   let cartId = await this.getOrCreateCartId();
  //   return this.getItem(cartId,productId).valueChanges().subscribe(q =>{
  //     return q.quantity;
  //   })
  // }
}
