import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

    create(product){
      this.db.list('/products').push(product);
    }

    getAll(){
      return this.db.list('/products').snapshotChanges();
    }

    get(productId){
      return this.db.object('/products/'+productId).valueChanges();
    }

    update(productId,product){
      return this.db.object('/products/'+productId).update(product);
    }

    delete(productId){
      console.log(productId);
      return this.db.object('/products/'+productId).remove();
    }
}
