### Data table

```
<div>
  <div class="example-container mat-elevation-z8">
    <mat-table [dataSource]="(articles$ | async)[0]?.products">
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef>Product Name</mat-header-cell>
        <mat-cell *matCellDef="let products">{{ products.attributes.name }}</mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>
  </div>
</div>
```

### ngOnDestroy

```
private _onDestroy = new Subject<void>();

ngOnInit() {
  this._router.events.pipe(
    startWith(null),
    switchMap(() => this.params),
    takeUntil(this._onDestroy)
  ).subscribe(p => this.setExpansions(p));
}

ngOnDestroy() {
  this._onDestroy.next();
  this._onDestroy.complete();
}
```

### Aspect ratio

```
gcd = (a, b) => {
  return b ? this.gcd(b, a % b) : a;
};

calculateAspectRatio(width, height) {
  const divisor = this.gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

innerWidth = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
innerHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);

viewPortWidth = new BehaviorSubject<number>(this.innerWidth);
viewPortHeight = new BehaviorSubject<number>(this.innerHeight);
aspectRatio = new BehaviorSubject<string>(
  `${this.viewPortWidth
    .getValue()
    .toString()}:${this.viewPortHeight.getValue().toString()}`
);

/**
  * Default constructor.
  * @param  {ObservableMedia} privateobservableMedia
  */
constructor(
  private viewportRuler: ViewportRuler,
  private observableMedia: ObservableMedia
) {
  this.viewportRuler.change().subscribe(resizeEvent => {
    this.viewPortWidth.next(this.viewportRuler.getViewportSize().width);
    this.viewPortHeight.next(this.viewportRuler.getViewportSize().height);
  });
}
```
