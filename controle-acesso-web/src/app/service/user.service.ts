import { HELP_DESK_API } from './helpdesk.api';
import { Usuario } from './../model/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: Usuario) {
    return this.http.post(`${HELP_DESK_API}/api/auth`, user);
  }

  findAutorizacaoPendente() {
    return this.http.get(`${HELP_DESK_API}/user/pendente`);
  }

  setAutorizacao(user: Usuario) {
    return this.http.put(`${HELP_DESK_API}/user/autorizar`, user);
  }

  save(user: Usuario) {
    user.id = null;
    return this.http.post(`${HELP_DESK_API}/user`, user);
  }

}