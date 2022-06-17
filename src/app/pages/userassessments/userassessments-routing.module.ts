import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserassessmentsComponent } from './userassessments.component';

const routes: Routes = [
  {
    path: '',
    component: UserassessmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserassessmentsRoutingModule { }
