import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  config = this.configService.getConfig();

  uri = `http://${this.config.server_name}:4000`;

  constructor(private configService: ConfigService, private http: HttpClient) { }
 
  getUserByEmail(email) {
    const emailJson = {
      email: email
    };
    return this.http.post(`${this.uri}/users/locateByEmail`, emailJson);
  }
}
