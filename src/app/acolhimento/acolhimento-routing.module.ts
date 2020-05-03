import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcolhimentoListComponent } from './acolhimento/acolhimento-list/acolhimento-list.component';
import { AcolhimentoStepperComponent } from './acolhimento/acolhimento-stepper/acolhimento-stepper.component';
import { AcolhidoComponent } from './acolhimento/acolhido/acolhido.component';


const routes: Routes = [
  {
    path: '',
    component: AcolhimentoListComponent
  },
  {
    path: 'stepper',
    component: AcolhimentoStepperComponent
  },
  {
    path: 'acolhido',
    component: AcolhidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcolhimentoRoutingModule { }
