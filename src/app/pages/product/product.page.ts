import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, skip, take, takeUntil } from 'rxjs/operators';
import { MainProxy } from 'src/app/core/store/main.proxy';

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {

  product$ = this.mainProxy.currentProduct$;
  amountsForm = this.fb.group({ quantity: 1, price: 0 });
  private productPrice = null;
  private destroy$ = new Subject();

  constructor(
    private mainProxy: MainProxy,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    const sku = this.route.snapshot.paramMap.get('sku');
    if (sku) {
      this.mainProxy.fetchProductBySku(Number(sku));
    } else {
      this.router.navigate(['/home']);
    }

    this.product$.pipe(filter(res => !!res), take(1)).subscribe(product => {
      this.productPrice = product.price;
      this.amountsForm.get('price').setValue(this.productPrice);
    });

    this.amountsForm.get('quantity').valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(val => {
        this.amountsForm.get('price').patchValue(this.calcPrice(val), { emitEvent: false });
      });

    this.amountsForm.get('price').valueChanges
      .pipe(skip(1), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(val => {
        this.amountsForm.get('quantity').patchValue(this.calcQuantity(val), { emitEvent: false });
      });
  }

  setQuantity(value) {
    this.amountsForm.get('quantity').setValue(value);
  }

  setPrice(value) {
    this.amountsForm.get('price').setValue(value);
  }

  ngOnDestroy() {
    this.mainProxy.clearCurrentProduct();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private calcPrice(val) {
    return val ? Math.round(((val * this.productPrice) + Number.EPSILON) * 100) / 100 : 0;
  }

  private calcQuantity(val) {
    return val ? Math.round(((val / this.productPrice) + Number.EPSILON) * 10) / 10 : 0;
  }
}
