import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AcolhimentoService } from '../../services/acolhimento.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewCompiler } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogBoxComponent } from 'src/app/utils/components/dialog-box/dialog-box.component';
import { AcolhimentoStepperComponent } from '../acolhimento-stepper/acolhimento-stepper.component';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-acolhido',
  templateUrl: './acolhido.component.html',
  styleUrls: ['./acolhido.component.css']
})
export class AcolhidoComponent implements OnInit {

  socket = io('http://localhost:4000');

  displayedColumns: string[] = ['nome', 'dataNasc', 'cpf', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('formulario') formTemplate: TemplateRef<any>;

  form: FormGroup;

  constructor(
    private acolhimentoService: AcolhimentoService,
    private dialog: MatDialog,
    private fb: FormBuilder,

  ) {

  }


  ngOnInit() {

    this.form = this.fb.group({
      _id: [''],
      nome: ['']
    })
    this.getAcolhido()
    this.socket.on('update-data', function (data: any) {
      this.getAcolhido()
    }.bind(this));



  }

  getAcolhido() {
    this.acolhimentoService.readAcolhido().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
        return this.getPropertyByPath(data, sortHeaderId);
      };
    });
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(action, obj) {
    obj.action = action || {};
    console.log(obj)
    const dialogRef = this.dialog.open(this.formTemplate, {
      maxWidth: '100vw',
      height: '100vh',
      data: {},
    });
  }

  setRow(row) {
    alert(row)
  }
}
