import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideAnimationsAsync('noop'), provideAnimationsAsync()] 
}).catch(err => console.error(err));