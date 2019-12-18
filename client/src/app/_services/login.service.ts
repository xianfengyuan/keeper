import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private config = this.configService.getConfig();
    private apiUrl = `http://${this.config.server_name}:4000`;
    constructor(private configService: ConfigService, private http: HttpClient) { }

    getAll() {
        return this.http.get(`${this.apiUrl}/logins`);
    }

    getById(id) {
        return this.http.get(`${this.apiUrl}/logins/${id}`);
    }

    add(username, password, established, comments) {
        const login = {
          username: username,
          password: password,
          established: established,
          comments: comments
        };
        return this.http.post(`${this.apiUrl}/logins/add`, login);
    }

    update(id, username, password, established, comments) {
        const login = {
            username: username,
            password: password,
            established: established,
            comments: comments
        };
        return this.http.put(`${this.apiUrl}/logins/${id}`, login);
    }

    delete(id) {
        return this.http.delete(`${this.apiUrl}/logins/${id}`);
    }
}