import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailserviceService {
  constructor(private http: HttpClient) { }

  getMails() {
    return this.http.get<any>('assets/mails.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }
}
