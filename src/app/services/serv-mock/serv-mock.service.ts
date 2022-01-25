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

  public postData(area: string, data: any) {
    return this.http.post(this.API_PREFIX + area, data);
  }

  public deleteData(endPoint: string, id: number) {
    return this.http.delete(this.API_PREFIX + endPoint + '/' + id);
  }

  public patchData(endPoint: string, id: number, data: any) {
    return this.http.patch(this.API_PREFIX + endPoint + '/' + id, data);
  }
}
