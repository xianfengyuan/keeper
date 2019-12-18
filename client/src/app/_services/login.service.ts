import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

import { Login } from '../_models';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private config = this.configService.getConfig();
    private apiUrl = `http://${this.config.server_name}:4000`;
    constructor(private configService: ConfigService, private http: HttpClient) { }

    getAll() {
        return this.http.get<Login[]>(`${this.apiUrl}/logins`);
    }

    add(login: Login) {
        return this.http.post(`${this.apiUrl}/logins/add`, login);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/logins/${id}`);
    }
}