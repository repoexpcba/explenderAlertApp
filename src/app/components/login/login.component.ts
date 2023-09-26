import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm = new LoginForm();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {}

  onSubmit() {
    const urlAPI = 'https://9213-200-126-197-195.ngrok.io/apiExplenderAlert/Login/iniciar_sesion';
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true' // Agregar el encabezado ngrok-skip-browser-warning
    });

    const requestBody = {
      username: this.loginForm.username,
      password: this.loginForm.password,
    };
    console.log(urlAPI)
    console.log(requestBody)
      console.log(headers)
    this.http.post(urlAPI, requestBody, { headers }).subscribe(
      (response: any) => {
        if (response.error) {
          if (this.loginForm.username == '' && this.loginForm.password == '') {
            alert('Ingrese datos para iniciar sesión');
          } else if (this.loginForm.password == '') {
            alert('Ingrese una contraseña!');
          } else if (this.loginForm.username == '') {
            alert('Ingrese un usuario!');
          } else {
            alert('Contraseña Incorrecta!');
          }
        } else {
          const token = response.token;
          const user_id = response.user_id;
          const expiresIn = 13600;
          const expirationDate = new Date().getTime() + expiresIn * 1000;
          const decodedToken = this.jwtHelper.decodeToken(token);
          const tipoUsuario = decodedToken.tipo_usuario;
          localStorage.setItem('token', token);
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('information', decodedToken);
          localStorage.setItem('expirationDate', expirationDate.toString());

          switch (tipoUsuario) {
            case "3": //Administrador
              window.location.href = '/alerts';
              break;
            
            case "2": //Monitoreo
              window.location.href = '/alerts';
              break;
            case "1": //Propietario
              window.location.href = '/buttonAlert';
              break;
            default:
              break;
          }
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  onCreateUser() {
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('expirationDate'));
  }
}
class LoginForm {
  username: string = '';
  password: string = '';
}