import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideAnimations()], // ✅ Добавили поддержку анимаций
}).catch((err) => console.error(err));
