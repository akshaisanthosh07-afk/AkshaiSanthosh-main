import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { Home } from './home/home';
import { AllWorks } from './all-works/all-works';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'all-works', component: AllWorks },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes, 
      withViewTransitions(),
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled' 
      })
    )
  ],
};
