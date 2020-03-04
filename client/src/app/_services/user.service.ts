import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ConfigService } from '../config.service';
import { EnvService } from './env.service';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    // private config = this.configService.getConfig();
    private apiUrl; // = `http://${this.config.server_name}:4000`;

    constructor(private env: EnvService, private http: HttpClient) {
        this.apiUrl = env.apiUrl;
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/users/add`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}