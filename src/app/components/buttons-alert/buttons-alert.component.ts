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
      // Obtener la ubicación del dispositivo
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Obtener las coordenadas de la ubicación
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Crear una cadena de ubicación con las coordenadas
            const ubicacion = `${latitude}, ${longitude}`;

            data.ubicacion = ubicacion;

            this.apiService
              .generateAlert('Alert', 'generateAlert', token, user_id, data)
              .subscribe(
                (response) => {
                  if (!response.error) {
                    alert('Se generó la alerta');
                  } else {
                    alert('Error al guardar la información');
                  }
                },
                (error) => {
                  alert('Ocurrió un error');
                }
              );
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
            alert('No se pudo obtener la ubicación del dispositivo');
          }
        );
      } else {
        alert('Geolocalización no soportada en este navegador');
      }
    } else {
      alert('No se encontró token');
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
