import { Component, OnInit, ViewChild, AfterViewInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Acolhimento } from '../../interfaces/acolhimento';
import { AcolhimentoService } from '../../services/acolhimento.service';
import { MatDialog } from '@angular/material/dialog';
import { AcolhimentoStepperComponent } from '../acolhimento-stepper/acolhimento-stepper.component';
import { DialogBoxComponent } from 'src/app/utils/components/dialog-box/dialog-box.component';

import * as io from 'socket.io-client';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-acolhimento-list',
  templateUrl: './acolhimento-list.component.html',
  styleUrls: ['./acolhimento-list.component.css'],
  providers: [DatePipe]
})
export class AcolhimentoListComponent implements OnInit {

  socket = io('http://localhost:4000');

  displayedColumns: string[] = ['acolhido.nome', 'dataIngresso', 'dataEgresso', 'convenio', 'action'];
  dataSource: MatTableDataSource<Acolhimento>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private acolhimentoService: AcolhimentoService,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit() {
    this.getAcolhimento()
    this.socket.on('update-data', function (data: any) {
      this.getAcolhimento()
    }.bind(this));



  }

  getAcolhimento() {
    this.acolhimentoService.readAcolhimento().subscribe((res: any) => {
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
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      maxWidth: '80vw',
      height: '100vh',
      data: {
        component: AcolhimentoStepperComponent,
        title: 'Plano Singular de Acolhimento', _id: obj._id, action: obj.action
      },
    });
  }


}

