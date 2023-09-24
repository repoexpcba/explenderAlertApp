import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  alerts: any[] = [];
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getAlerts()
  }

  getAlerts() {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (token != null && user_id != null) {
      this.apiService.getAlerts('Alert', 'getAlerts', token, user_id,).subscribe(
        (response) => {
          this.alerts = response.data;
          console.log(response)
        },
        (error) => {

        }
      );
      // this.apiService
      //   .paginated('provinces', token, this.currentPage, this.pageSize)
      //   .subscribe(
      //     (data) => {
      //       this.provinces = data.content;
      //       this.totalItems = data.totalElements;
      //     },
      //     (error) => {
      //       console.log(
      //         'Error al obtener los datos de los centros médicos:',
      //         error
      //       );
      //     }
      //   );
    } else {
      console.log('No se encontro token');
    }
  }
}
