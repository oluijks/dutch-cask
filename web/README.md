# Dutch Cask Web App

## Installation

## Documentation

### Project Structure

```
.
├── docker-compose.yml
├── karma.conf.js
├── ngsw-config.json
├── src
│   ├── app
│   │   ├── animations
│   │   │   └── router.animations.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── classes
│   │   │   └── unsubscribe-on-destroy.ts
│   │   ├── components
│   │   │   ├── about
│   │   │   │   ├── about.component.html
│   │   │   │   ├── about.component.scss
│   │   │   │   ├── about.component.spec.ts
│   │   │   │   └── about.component.ts
│   │   │   ├── home
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   └── home.component.ts
│   │   │   ├── index.ts
│   │   │   ├── license
│   │   │   │   ├── license.component.spec.ts
│   │   │   │   └── license.component.ts
│   │   │   ├── not-found
│   │   │   │   ├── not-found.component.html
│   │   │   │   ├── not-found.component.scss
│   │   │   │   ├── not-found.component.spec.ts
│   │   │   │   └── not-found.component.ts
│   │   │   └── shared
│   │   │       ├── confirm-dialog.component.ts
│   │   │       ├── demo-message.component.ts
│   │   │       ├── footer
│   │   │       │   ├── footer.component.spec.ts
│   │   │       │   ├── footer.component.ts
│   │   │       │   └── _footer-theme.scss
│   │   │       ├── loading-spinner.component.spec.ts
│   │   │       ├── loading-spinner.component.ts
│   │   │       ├── menus
│   │   │       │   └── category
│   │   │       │       ├── category.component.html
│   │   │       │       ├── category.component.scss
│   │   │       │       ├── category.component.spec.ts
│   │   │       │       └── category.component.ts
│   │   │       ├── page-header.component.spec.ts
│   │   │       └── page-header.component.ts
│   │   ├── directives
│   │   │   └── article-carousel.directive.ts
│   │   ├── interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   └── general.interceptor.ts
│   │   ├── models
│   │   │   ├── static-page.model.ts
│   │   │   └── timestamps.model.ts
│   │   ├── modules
│   │   │   ├── catalog
│   │   │   │   ├── category
│   │   │   │   │   ├── category.module.spec.ts
│   │   │   │   │   ├── category.module.ts
│   │   │   │   │   └── category-routing.module.ts
│   │   │   │   └── product
│   │   │   │       ├── components
│   │   │   │       │   ├── index.ts
│   │   │   │       │   ├── product-item
│   │   │   │       │   │   ├── product-item.component.html
│   │   │   │       │   │   ├── product-item.component.scss
│   │   │   │       │   │   └── product-item.component.ts
│   │   │   │       │   └── product-list
│   │   │   │       │       └── product-list.component.ts
│   │   │   │       ├── containers
│   │   │   │       │   ├── index.ts
│   │   │   │       │   └── products
│   │   │   │       │       └── products.component.ts
│   │   │   │       ├── models
│   │   │   │       │   ├── article-carousel-context.ts
│   │   │   │       │   ├── article.model.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── product.module.ts
│   │   │   │       ├── product-routing.module.ts
│   │   │   │       └── store
│   │   │   │           ├── actions
│   │   │   │           │   ├── articles.actions.ts
│   │   │   │           │   └── index.ts
│   │   │   │           ├── article.resolver.ts
│   │   │   │           ├── effects
│   │   │   │           │   ├── articles.effect.ts
│   │   │   │           │   └── index.ts
│   │   │   │           ├── index.ts
│   │   │   │           └── reducers
│   │   │   │               ├── articles.reducer.ts
│   │   │   │               └── index.ts
│   │   │   ├── checkout
│   │   │   │   ├── checkout.module.spec.ts
│   │   │   │   ├── checkout.module.ts
│   │   │   │   ├── checkout-routing.module.ts
│   │   │   │   ├── components
│   │   │   │   │   ├── billing
│   │   │   │   │   │   ├── billing.component.html
│   │   │   │   │   │   ├── billing.component.scss
│   │   │   │   │   │   ├── billing.component.spec.ts
│   │   │   │   │   │   └── billing.component.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── order-failed
│   │   │   │   │   │   ├── order-failed.component.html
│   │   │   │   │   │   ├── order-failed.component.scss
│   │   │   │   │   │   ├── order-failed.component.spec.ts
│   │   │   │   │   │   └── order-failed.component.ts
│   │   │   │   │   ├── order-review
│   │   │   │   │   │   ├── order-review.component.html
│   │   │   │   │   │   ├── order-review.component.scss
│   │   │   │   │   │   ├── order-review.component.spec.ts
│   │   │   │   │   │   └── order-review.component.ts
│   │   │   │   │   ├── order-success
│   │   │   │   │   │   ├── order-success.component.html
│   │   │   │   │   │   ├── order-success.component.scss
│   │   │   │   │   │   ├── order-success.component.spec.ts
│   │   │   │   │   │   └── order-success.component.ts
│   │   │   │   │   ├── payment
│   │   │   │   │   │   ├── payment.component.html
│   │   │   │   │   │   ├── payment.component.scss
│   │   │   │   │   │   ├── payment.component.spec.ts
│   │   │   │   │   │   └── payment.component.ts
│   │   │   │   │   ├── shared
│   │   │   │   │   │   ├── checkout-button
│   │   │   │   │   │   │   ├── checkout-button.component.spec.ts
│   │   │   │   │   │   │   └── checkout-button.component.ts
│   │   │   │   │   │   ├── discount-code
│   │   │   │   │   │   │   ├── discount-code.component.spec.ts
│   │   │   │   │   │   │   └── discount-code.component.ts
│   │   │   │   │   │   ├── estimate-shipping-tax
│   │   │   │   │   │   │   ├── estimate-shipping-tax.component.spec.ts
│   │   │   │   │   │   │   └── estimate-shipping-tax.component.ts
│   │   │   │   │   │   └── price-box
│   │   │   │   │   │       ├── price-box.component.spec.ts
│   │   │   │   │   │       └── price-box.component.ts
│   │   │   │   │   ├── shipping
│   │   │   │   │   │   ├── shipping.component.html
│   │   │   │   │   │   ├── shipping.component.scss
│   │   │   │   │   │   ├── shipping.component.spec.ts
│   │   │   │   │   │   └── shipping.component.ts
│   │   │   │   │   └── shopping-cart
│   │   │   │   │       ├── cart-toolbar
│   │   │   │   │       │   ├── cart-toolbar.component.spec.ts
│   │   │   │   │       │   └── cart-toolbar.component.ts
│   │   │   │   │       ├── shopping-cart.component.html
│   │   │   │   │       ├── shopping-cart.component.scss
│   │   │   │   │       ├── shopping-cart.component.spec.ts
│   │   │   │   │       └── shopping-cart.component.ts
│   │   │   │   ├── containers
│   │   │   │   │   ├── checkout
│   │   │   │   │   │   ├── checkout.component.html
│   │   │   │   │   │   ├── checkout.component.spec.ts
│   │   │   │   │   │   └── checkout.component.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── store
│   │   │   │       ├── actions
│   │   │   │       │   ├── cart.actions.ts
│   │   │   │       │   └── index.ts
│   │   │   │       ├── index.ts
│   │   │   │       ├── models
│   │   │   │       │   ├── cart.model.ts
│   │   │   │       │   └── index.ts
│   │   │   │       └── reducers
│   │   │   │           ├── cart.reducer.ts
│   │   │   │           └── index.ts
│   │   │   ├── cms
│   │   │   │   ├── cms.module.spec.ts
│   │   │   │   ├── cms.module.ts
│   │   │   │   ├── cms-routing.module.ts
│   │   │   │   ├── components
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── page
│   │   │   │   │       ├── page.component.html
│   │   │   │   │       ├── page.component.scss
│   │   │   │   │       ├── page.component.spec.ts
│   │   │   │   │       └── page.component.ts
│   │   │   │   └── elements
│   │   │   │       └── static-page
│   │   │   │           ├── static-page.component.spec.ts
│   │   │   │           └── static-page.component.ts
│   │   │   ├── core.module.ts
│   │   │   ├── customer
│   │   │   │   ├── customer.module.spec.ts
│   │   │   │   ├── customer.module.ts
│   │   │   │   └── customer-routing.module.ts
│   │   │   ├── material.module.ts
│   │   │   └── shared.module.ts
│   │   ├── pipes
│   │   │   ├── capitalize.pipe.ts
│   │   │   └──  safe.pipe.ts
│   │   ├── services
│   │   │   ├── index.ts
│   │   │   ├── loading-spinner.service.ts
│   │   │   ├── local-storage.service.ts
│   │   │   ├── logger.service.spec.ts
│   │   │   ├── logger.service.ts
│   │   │   ├── service-worker
│   │   │   │   ├── check-for-update.service.ts
│   │   │   │   ├── log-update.service.ts
│   │   │   │   ├── prompt-update.service.ts
│   │   │   │   └── push-subscription.service.ts
│   │   │   └── window.service.ts
│   │   └── store
│   │       ├── push-subscription
│   │       │   ├── actions
│   │       │   │   ├── index.ts
│   │       │   │   └── push-subscription.actions.ts
│   │       │   ├── index.ts
│   │       │   ├── models
│   │       │   │   ├── index.ts
│   │       │   │   └── push-subscription-state.model.ts
│   │       │   └── reducers
│   │       │       ├── index.ts
│   │       │       └── push-subscription.reducer.ts
│   │       └── router
│   │           ├── custom-router-serializer.ts
│   │           ├── index.ts
│   │           ├── models
│   │           │   ├── index.ts
│   │           │   └── router-state.model.ts
│   │           └── reducers
│   │               ├── index.ts
│   │               └── router.reducer.ts
│   ├── assets
│   │   └── images
│   │       └── icons
│   │           ├── icon-128x128.png
│   │           ├── icon-144x144.png
│   │           ├── icon-152x152.png
│   │           ├── icon-192x192.png
│   │           ├── icon-384x384.png
│   │           ├── icon-512x512.png
│   │           ├── icon-512x512-square.png
│   │           ├── icon-72x72.png
│   │           ├── icon-96x96.png
│   │           └── ios
│   │               ├── apple-touch-icon-114x114.png
│   │               ├── apple-touch-icon-120x120.png
│   │               ├── apple-touch-icon-144x144.png
│   │               ├── apple-touch-icon-152x152.png
│   │               ├── apple-touch-icon-180x180.png
│   │               ├── apple-touch-icon-57x57.png
│   │               ├── apple-touch-icon-72x72.png
│   │               ├── apple-touch-icon-76x76.png
│   │               ├── apple-touch-icon.png
│   │               └── favicon.ico
│   ├── browserslist
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── manifest.json
│   ├── polyfills.ts
│   ├── styles
│   │   ├── main.scss
│   │   ├── theme.scss
│   │   └── typography.scss
│   └── test.ts
├── tsconfig.app.json
├── tsconfig.spec.json
└── tslint.json
```

## License

MIT
