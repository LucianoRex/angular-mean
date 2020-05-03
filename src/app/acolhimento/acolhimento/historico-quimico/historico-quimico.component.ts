import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AcolhimentoService } from '../../services/acolhimento.service';
import { MatDialog } from '@angular/material/dialog';

import * as io from 'socket.io-client';
import { ComponentController } from 'src/app/utils/controllers/component-controller';

@Component({
  selector: 'app-historico-quimico',
  templateUrl: './historico-quimico.component.html',
  styleUrls: ['./historico-quimico.component.css']
})
export class HistoricoQuimicoComponent extends ComponentController implements OnInit {

  socket = io('http://localhost:4000');
  @Input() _id: string;
  displayedColumns: string[] = ['substancia', 'idade', 'action'];



  @ViewChild('formulario') formTemplate: TemplateRef<any>;

  form: FormGroup;
  substanciaList;

  constructor(
    private acolhimentoService: AcolhimentoService,
    private dialog: MatDialog,
    private fb: FormBuilder,

  ) {
    super();
  }


  ngOnInit() {

    this.form = this.fb.group({
      _id: undefined,
      idade: [''],
      substancia: this.fb.group({
        _id: [''],
        nome: ['']
      }),
    });

    this.acolhimentoService.readSubstancia().subscribe(res => {
      this.substanciaList = res;
    });

    this.getHistoricoQuimico();

    this.socket.on('update-data', function (data: any) {
      this.getHistoricoQuimico()
    }.bind(this));



  }

  getHistoricoQuimico() {
    this.acolhimentoService.readHistoricoQuimico(this._id).subscribe((res: any) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res.historicoQuimico);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
        return this.getPropertyByPath(data, sortHeaderId);
      };
    });
  }

 


  openDialog(action, obj) {
    obj.action = action || {};
    console.log(obj)
    this.form.patchValue(obj);
    console.log(this.form.get('substancia'))
    const dialogRef = this.dialog.open(this.formTemplate, {
      maxWidth: '100vw',
      height: '100vh',
      data: {},

    });
  }

  saveAcolhimento() {
    this.acolhimentoService.saveHistoricoQuimico(this.form, this._id).subscribe(res => {
      this.socket.emit('updatedata', res);
    })
  }

}
