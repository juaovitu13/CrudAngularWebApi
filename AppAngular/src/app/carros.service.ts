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
  ExcluirCarro(Id: any) {
    throw new Error('Method not implemented.');
  }

  url = 'http://localhost:5088/Carro';

  constructor(private http: HttpClient) { }

  ObterTodos(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.url);
  }

  ObterPorId(Id: number): Observable<Carro> {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.get<Carro>(apiUrl);
  }

  Create(carro: Carro): Observable<any> {
    return this.http.post<Carro>(this.url, carro, httpOptions);
  }

  Atualizar(carro: Carro): Observable<any> {
    return this.http.put<Carro>(this.url, carro, httpOptions);
  }

  Deletar(Id: number): Observable<any> {
    const apiUrl = `${this.url}/${Id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
