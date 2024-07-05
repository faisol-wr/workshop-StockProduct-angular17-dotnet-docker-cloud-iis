import { ApplicationConfig } from '@angular/core';
import {
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling(scrollConfig),
      withViewTransitions()
    ),
  ],
};
