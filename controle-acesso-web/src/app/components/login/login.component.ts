import { SharedService } from './../../service/shared.service';
import { CurrentUsuario } from './../../model/current-usuario';
import { UserService } from './../../service/user.service';
import { Usuario } from './../../model/usuario';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  message : string;  
  user = new Usuario('','','','','');
  shared : SharedService;

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      //this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  login(){
    this.message = '';
    this.userService.login(this.user).subscribe((userAuthentication:CurrentUsuario) => {
        //this.shared.token = userAuthentication.token;
        this.shared.user = userAuthentication.user;
        //this.shared.user.profile = this.shared.user.profile.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
    } , err => {
      //this.shared.token = null;
      //this.shared.user = null;
      //this.shared.showTemplate.emit(false);
      this.message = 'Erro ';
    });
  }

}
