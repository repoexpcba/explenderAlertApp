import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons-alert',
  templateUrl: './buttons-alert.component.html',
  styleUrls: ['./buttons-alert.component.css']
})
export class ButtonsAlertComponent {
  securityAlert() {
    console.log("alerta Seguridad")
  }

  medicalAlert() {
    console.log("alerta medica")
  }

  otherAlert() {
    console.log("otras alertas")
  }
}
