import { NgModule } from '@angular/core';

import {
  FormatDateAdapter,
  FORMAT_DATE_FORMATS,
} from '@shared/directives/date-adapter';

import {
  DateAdapter,
  MatNativeDateModule,
  MatOptionModule,
  MAT_DATE_FORMATS,
} from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProgressBarModule } from "angular-progress-bar";
@NgModule({
  declarations: [],
  imports: [
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ProgressBarModule
  ],
  exports:[
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ProgressBarModule
  ],providers: [
    {
      provide: DateAdapter,
      useClass: FormatDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: FORMAT_DATE_FORMATS,
    },
  ],
})
export class SharedMaterialModule { }
