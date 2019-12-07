import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  config = this.configService.getConfig();

  uri = `http://${this.config.server_name}:4000`;

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getLogins() {
    return this.http.get(`${this.uri}/logins`);
  }

  getLoginById(id) {
    return this.http.get(`${this.uri}/logins/${id}`);
  }

  addLogin(username, password, established, comments) {
    const login = {
      username: username,
      password: password,
      established: established,
      comments: comments
    };
    return this.http.post(`${this.uri}/logins/add`, login);
  }

  updateLogin(id, username, password, established, comments) {
    const login = {
      username: username,
      password: password,
      established: established,
      comments: comments
    };
    return this.http.post(`${this.uri}/logins/update/${id}`, login);
  }

  deleteLogin(id) {
    return this.http.get(`${this.uri}/logins/delete/${id}`);
  }
}
