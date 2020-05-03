import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AcolhimentoService {


  constructor(
    //   private firestore: AngularFirestore,
    private http: HttpClient
  ) { }

  saveAcolhimento(form: FormGroup) {
    console.log(form.value)
    if (form.get('_id').value == undefined) {
      return this.http.post(`${apiUrl}/acolhimento`, form.value)
    } else {
      let data = Object.assign({}, form.value);
      delete data._id;
      return this.http.put(`${apiUrl}/acolhimento/${form.get('_id').value}`, data)
    }

  }

  readAcolhimento(): Observable<any> {
    return this.http.get(`${apiUrl}/acolhimento`);
  }

  readHistoricoQuimico(_id: string) {
    return this.http.get(`${apiUrl}/acolhimento/${_id}/historico-quimico`)
  }

  saveHistoricoQuimico(form: FormGroup, _id: string) {
    console.log(form.value)
    console.log(_id)
    
      return this.http.post(`${apiUrl}/acolhimento/${_id}/historico-quimico`, form.value)
    
  }

  readAcolhimentoById(_id: string) {
    return this.http.get(`${apiUrl}/acolhimento/${_id}`)
  }

  readConvenio(): Observable<any> {
    return this.http.get(`${apiUrl}/convenio`)
  }
  /**
   * 
   * 
   */

  readAcolhido() {
    return this.http.get(`${apiUrl}/acolhido`);
  }



  /**
   * 
   * 
   */

  readSubstancia(): Observable<any> {
    return this.http.get(`${apiUrl}/substancia`);
  }
}
