// app.config.server.ts
// FIX: Angular 21 SSR requiere provideServerRoutesConfig para registrar
//      las serverRoutes definidas en app.routes.server.ts.
//      Sin esto, el servidor no sabe cómo renderizar cada ruta (Prerender vs Server).
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes), // ← CRÍTICO: registra las server routes
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);