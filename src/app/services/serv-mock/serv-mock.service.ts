import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServMovkApiService {
  private API_PREFIX = environment.apiMock;

  constructor(private http: HttpClient) {}

  public getData(endPoint: string) {
    return this.http.get(this.API_PREFIX + endPoint);
  }
}
