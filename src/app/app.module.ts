import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MomentDateAdapter,
  MomentDateModule,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { ApiService } from './api/api-service';
import { EvaluationApiService } from './api/evaluation/evaluation-api.service';
import { CacheInterceptor } from './api/interceptor/cache-interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { TimeConfig } from './shared/time-config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MomentDateModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: TimeConfig.dateFormat,
        },
        display: {
          dateInput: TimeConfig.dateFormat,
          monthYearLabel: 'YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY',
        },
      },
    },
    {
      provide: ApiService,
      useClass: environment.apiService,
    },
    {
      provide: EvaluationApiService,
      useClass: environment.evaluationApiService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    [...environment.providers],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
