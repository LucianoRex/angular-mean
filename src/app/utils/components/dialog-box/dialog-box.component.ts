import { Component, OnInit, Optional, Inject, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  title: string;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    console.log(this.data._id)
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    const newComponentRef = this.viewContainerRef.createComponent(factory);
    newComponentRef.instance['_id'] = this.data._id;
    newComponentRef.instance['action'] = this.data.action;    
    this.title = this.data.title;
  }

}
