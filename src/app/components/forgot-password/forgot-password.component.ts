import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private dialogRef: MatDialogRef<ForgotPasswordComponent>, private http: HttpClient, private snackBar: MatSnackBar) {
  }

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      });

      this.http.get<any>('https://d36d-200-126-197-195.ngrok-free.app/apiExplenderAlert/User/getEmails?email=' + email, { headers }).subscribe(
        (response) => {
          if (response) {
            alert("Se enviara un correo a su email para recuperar la contraseña, recuerde revisar carpeta de spam si no lo encuentra");
            const body = { email: email };
            this.http.post<any>('https://d36d-200-126-197-195.ngrok-free.app/apiExplenderAlert/User/recoverPasswordMail', body, { headers }).subscribe(
              (response) => {
                console.log("se envio")
              },
              (error) => {
                console.log("error")
              }
            );
          } else {
            alert('El correo electrónico no existe en la base de datos, intente nuevamente');
          }
        },
        (error) => {
          console.error('Error en la llamada a la API:', error);
          // Mostrar un mensaje de error o realizar acciones adicionales según sea necesario
        }
      );
    }
  }

  close(e: Event) {
    e.preventDefault();
    this.dialogRef.close();
  }
}