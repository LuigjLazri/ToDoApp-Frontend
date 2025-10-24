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
    const basicAuth = localStorage.getItem("BasicAuth") ?? "";
    console.log("BASIC AUTH: "+ basicAuth)

    return new HttpHeaders({
      'Authorization': basicAuth
    });
  }

}
