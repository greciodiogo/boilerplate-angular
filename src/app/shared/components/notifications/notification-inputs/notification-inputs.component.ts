import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from '@app/shared/services/form.service';

export interface PersonInterface{
  id?:number;
  name:string;
  email:string;
}

export class Notification{
  canalSms: boolean = false;
  canalEmail: boolean = false;
  isCheckedDireccao: boolean = false;
  direcaoId: Number = null;
  usersDirecao: PersonInterface[] = [];
  isCheckedCliente: boolean = false;
  clientes: PersonInterface[] = [];
}

export interface Configs{ 
  inputDireccao: boolean;
  inputCliente: boolean;
}

@Component({
  selector: 'app-notification-inputs',
  templateUrl: './notification-inputs.component.html',
  styleUrls: ['./notification-inputs.component.css']
})
export class NotificationInputsComponent implements OnInit {

  @Output() selected = new EventEmitter<any>();
  @Input() notification: Notification = new Notification();
  @Input() configs: Configs = {
    inputDireccao: false,
    inputCliente: true
  }

  direccoes: any[] = [];

  constructor(private formService: FormService) {}

 
  ngOnInit(): void {
  }

  selectEventSms(event){ 
    this.notification.canalSms = event.checked;
    this.selectEvent(event);
  }
  selectEventEmail(event){ 
    this.notification.canalEmail = event.checked;
    this.selectEvent(event);
  }

  checkedDireccao(event){ 
    this.getDireccoes();
    if(event.checked){
      this.notification.direcaoId = null;
    }
    this.notification.isCheckedDireccao = event.checked; 
    this.selectEvent(event);
  }

  checkedCliente(event){  
    if(event.checked){
      this.notification.clientes = [];
    }
    this.notification.isCheckedCliente = event.checked; 
    this.selectEvent(event);

    this.selectEvent(event);
  }

  selectEvent(event){  
    this.notification.isCheckedDireccao = event.checked;
    console.log(this.notification);
    this.selected.emit(this.notification);
  }
 
  getDireccoes() {
    if( this.direccoes.length > 0) return;
    this.formService.getDireccoes().subscribe(
      (data) => {
        this.direccoes = data
      },
      (error) => { 
      })
  }

}
