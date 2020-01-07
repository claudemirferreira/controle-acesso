import { CurrentUsuario } from './../../../model/current-usuario';
import { Usuario } from './../../../model/usuario';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  user: Usuario;
  message: {};
  classCss: {};

  constructor(private service: UserService) { }

  ngOnInit() {
    this.user = new Usuario('', '', '', '', '');
  }

  save(user: Usuario) {
    this.message = '';
    this.service.save(this.user).subscribe((userAuthentication: CurrentUsuario) => {
      this.message = 'Cadastro realizado com sucesso';
      this.ngOnInit();
    }, err => {
      this.message = 'Erro ';
    });
  }

}