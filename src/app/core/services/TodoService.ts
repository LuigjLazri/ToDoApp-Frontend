import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItemModel} from '../../models/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItemModel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<TodoItemModel[]>(this.apiUrl, { headers });
  }

  addTodo(todo: TodoItemModel): Observable<TodoItemModel> {
    const headers = this.getAuthHeaders();
    return this.http.post<TodoItemModel>(this.apiUrl, todo, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const username = 'user';
    const password = 'password';
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    console.log(basicAuth);

    return new HttpHeaders({
      'Authorization': basicAuth,
    });
  }

}
