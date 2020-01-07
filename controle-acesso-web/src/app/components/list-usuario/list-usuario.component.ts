import { ResponseApi } from './../../model/response-api';
import { Usuario } from './../../model/usuario';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  users : Usuario[];
  message: {};
  classCss: {};

  displayedColumns: string[] = ['id','login', 'autorizado'];

  constructor(private service: UserService) { }

  ngOnInit() {
    this.perfilUsuario();
  }

  autorizar(element : Usuario){
    element.autorizado = 'S';
    this.setAutorizacao(element);
  }

  desautorizar(element : Usuario){
    element.autorizado = 'N';
    this.setAutorizacao(element);
  }

  setAutorizacao(user : Usuario){
    this.service.setAutorizacao(user).subscribe((responseApi: ResponseApi) => {
      //this.users = responseApi['data'];
      this.perfilUsuario();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  perfilUsuario() {
    this.service.findAutorizacaoPendente().subscribe((responseApi: ResponseApi) => {
      this.users = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

}
