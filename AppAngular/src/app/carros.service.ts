import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carro } from './Carro';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CarrosService {
  url = 'http://localhost:5088/Obtertodos';

  constructor(private http: HttpClient) {}

  ObterTodos(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.url);
  }

  ObterPorId(carroId: number): Observable<Carro> {
    const apiUrl = `${this.url}/${carroId}`;
    return this.http.get<Carro>(apiUrl);
  }

  Salvar(carro: Carro): Observable<any> {
    return this.http.post<Carro>(this.url, carro, httpOptions);
  }

  Atualizar(carro: Carro): Observable<any> {
    return this.http.put<Carro>(this.url, carro, httpOptions);
  }

  ExcluirCarro(carroId: number): Observable<any> {
    const apiUrl = `${this.url}/${carroId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
