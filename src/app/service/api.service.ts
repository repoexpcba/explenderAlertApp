import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**
 * Manejo de solicitudes HTTP con la API
 */
export class ApiService {
  private urlAPI = 'https://d36d-200-126-197-195.ngrok-free.app/apiExplenderAlert/';

  constructor(private http: HttpClient) { }

  /**
   * Genera una alerta
   * @param controller
   * @param endpoint
   * @param token 
   * @returns 
   */
  public generateAlert(controller: string, endpoint: string, token: string, user_id: string, data: object): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const body = { ...data, user_id: user_id };
    return this.http.post<any>(this.urlAPI + controller + '/' + endpoint, body, { headers });
  }

  /**
   * Obtiene todos los registros
   * @param endpoint 
   * @param token 
   * @returns 
   */
  public getAlerts(controller: string, endpoint: string, token: string, user_id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const body = { token : token,user_id: user_id };

    return this.http.post<any>(this.urlAPI + controller + '/' + endpoint, body, { headers });
  }

}
