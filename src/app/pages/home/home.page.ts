import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { MainProxy } from 'src/app/core/store/main.proxy';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  searchInput$ = new BehaviorSubject(null);
  productsList$ = this.searchInput();

  constructor(
    private mainProxy: MainProxy,
    private storage: Storage,
    private router: Router) {
  }

  async ngOnInit() {
    this.mainProxy.fetchProducts();

    const searchText = await this.storage.get('searchText');
    if (searchText) {
      this.searchInput$.next(searchText);
    }
  }

  goProduct(sku) {
    this.router.navigate(['/product', sku]);
  }

  clearSearch() {
    this.searchInput$.next(null);
  }

  searchInputHandler(input) {
    this.storage.set('searchText', input);
    this.searchInput$.next(input);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      setTimeout(() => window.location.reload(), 1000);
    }, 2000);
  }

  private searchInput() {
    return this.searchInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((inputVal: string) => this.mainProxy.productsList$.pipe(
        map(results => results.filter(item => {
          const name = item.name.toLowerCase();
          if (!inputVal || (inputVal && name.includes(inputVal.toLowerCase()))) {
            return item;
          }
        }))
      ))
    );
  }

}
