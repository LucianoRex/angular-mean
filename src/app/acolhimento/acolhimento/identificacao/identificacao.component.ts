import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AcolhimentoService } from '../../services/acolhimento.service';

import * as io from 'socket.io-client';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/utils/components/dialog-box/dialog-box.component';
import { AcolhidoComponent } from '../acolhido/acolhido.component';


@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.css']
})
export class IdentificacaoComponent implements OnInit {

  socket = io('http://localhost:4000');

  @Input() _id: string;
  @Output() notify = new EventEmitter<FormGroup>()
  acolhimentoFormGroup: FormGroup;
  convenioList: any[];
  encaminhadoList = [
    'CAPS',
    'UBS',
    'HOSPITAL',
    'AMIGO',
    'FAMILIAR'
  ]
  constructor(
    private _formBuilder: FormBuilder,
    private acolhimentoService: AcolhimentoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.acolhimentoFormGroup = this._formBuilder.group({
      _id: undefined,
      acolhido: this._formBuilder.group({
        _id: [''],
        nome: ['']
      }),
      dataIngresso: ['', Validators.required],
      dataEgresso: [''],
      convenio: ['', Validators.required],
      encaminhado: ['']
    });

    this.acolhimentoService.readConvenio().subscribe(res => {
      this.convenioList = res;
    });

    if (this._id !== undefined) {

      this.acolhimentoService.readAcolhimentoById(this._id).subscribe(res => {
        console.log(res);
        this.acolhimentoFormGroup.patchValue(res);
        this.notify.emit(this.acolhimentoFormGroup)
      });
    } else {

      this.notify.emit(this.acolhimentoFormGroup)
    }
    this.acolhimentoFormGroup.valueChanges.subscribe(res => {
    })
    console.log(this.acolhimentoFormGroup.dirty)
  }

  openModalWithComponent(e: Event) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault()
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '100vw',
      height: '100vh',
      data: {
        component: AcolhidoComponent,
        title: 'Acolhidos',
      },
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.acolhimentoFormGroup.patchValue({ acolhido: result })

    });

  }

  saveAcolhimento() {
    this.acolhimentoService.saveAcolhimento(this.acolhimentoFormGroup).subscribe(res => {
      this.socket.emit('updatedata', res);
    })
  }



}
