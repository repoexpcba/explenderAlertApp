import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Alert } from '../alerts/alert.model';

@Component({
  selector: 'app-buttons-alert',
  templateUrl: './buttons-alert.component.html',
  styleUrls: ['./buttons-alert.component.css']
})
export class ButtonsAlertComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
  }
  securityAlert() {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    const data: Alert = {
      user_id: user_id,
      ubicacion: "",
      fecha: new Date,
      tipo_alerta_id : 1,
      token : token
    }

    if (token != null && user_id != null) {
      this.apiService.generateAlert('Alert', 'generateAlert', token, user_id, data).subscribe(
        (response) => {
          if (!response.error) {
            alert('Se generó la alerta');
          } else {
            alert('Error al guardar la informacion')
          }
        },
        (error) => {
          alert('Ocurrió un error');
        }
      );
    } else {
      alert("No se encontró token")
    }
    console.log("alerta Seguridad")
  }

  medicalAlert() {
    console.log("alerta medica")
  }

  otherAlert() {
    console.log("otras alertas")
  }
}
