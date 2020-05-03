import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AcolhimentoService } from '../../services/acolhimento.service';

@Component({
  selector: 'app-acolhimento-stepper',
  templateUrl: './acolhimento-stepper.component.html',
  styleUrls: ['./acolhimento-stepper.component.css']
})
export class AcolhimentoStepperComponent implements OnInit {

  isLinear = false;
  @Input() _id: string;
  @Input() action: string;
  form: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
    private acolhimentoService: AcolhimentoService
  ) { }

  ngOnInit() {
    console.log(this.action)
    if(this.action == 'Update'){
      this.isLinear = false
    }else{
      this.isLinear = true
    }
  }

  onNotify(formGroup: FormGroup): void {
    this.form = formGroup;
    console.log(this.form)
  }

}
