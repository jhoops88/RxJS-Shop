import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ProductService } from './product.service';

export const appConfig: ApplicationConfig = {
  providers: [
    ProductService,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)]
};