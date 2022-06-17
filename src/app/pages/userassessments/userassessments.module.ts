import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserassessmentsRoutingModule } from './userassessments-routing.module';
import { UserassessmentsComponent } from './userassessments.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserassessmentsComponent
  ],
  imports: [
    CommonModule,
    UserassessmentsRoutingModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class UserassessmentsModule { }
