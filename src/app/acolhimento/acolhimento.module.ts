import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcolhimentoRoutingModule } from './acolhimento-routing.module';
import { AcolhimentoListComponent } from './acolhimento/acolhimento-list/acolhimento-list.component';
import { RouterModule } from '@angular/router';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { AcolhimentoStepperComponent } from './acolhimento/acolhimento-stepper/acolhimento-stepper.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { IdentificacaoComponent } from './acolhimento/identificacao/identificacao.component';
import { AcolhidoComponent } from './acolhimento/acolhido/acolhido.component';
import { UtilsModule } from '../utils/utils.module';
import { HistoricoQuimicoComponent } from './acolhimento/historico-quimico/historico-quimico.component';
import { MedicamentoComponent } from './acolhimento/medicamento/medicamento.component';
import { TratamentoComponent } from './acolhimento/tratamento/tratamento.component';
import { HistoricoPsiquicoComponent } from './acolhimento/historico-psiquico/historico-psiquico.component';
import { HistoricoFamiliarSocialComponent } from './acolhimento/historico-familiar-social/historico-familiar-social.component';
import { HistoricoForenseComponent } from './acolhimento/historico-forense/historico-forense.component';
import { SaidaComponent } from './acolhimento/saida/saida.component';
import { BiometriaComponent } from './acolhimento/biometria/biometria.component';


@NgModule({
  declarations: [AcolhimentoListComponent, AcolhimentoComponent, AcolhimentoStepperComponent, IdentificacaoComponent, AcolhidoComponent, HistoricoQuimicoComponent, MedicamentoComponent, TratamentoComponent, HistoricoPsiquicoComponent, HistoricoFamiliarSocialComponent, HistoricoForenseComponent, SaidaComponent, BiometriaComponent],
  imports: [
    MaterialModule,
    CommonModule,
    AcolhimentoRoutingModule,
    RouterModule,
    ReactiveFormsModule,   
    UtilsModule
  ]
})
export class AcolhimentoModule { }
