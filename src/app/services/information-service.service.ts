import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationServiceService {

  private apiUrl: string = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  saveInformation(topicId: number, question: string, answer: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/information`, {
      topicId: topicId,
      question: question,
      answer: answer
    });
  }

  getAllInformation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all-information`);
  }

  getAllTopicInformation(topicId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/all-information/${topicId}`);
  }

  getAllTopics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/topics`)
  }

  deleteInformationById(id: number) {
    return this.http.delete(`${this.apiUrl}/all-information/${id}`, {
      responseType: 'text'
    });
  }

  updateInformation(payload: any) {
    return this.http.put(`${this.apiUrl}/information`, payload);
  }

  searchInformation(topicId: number, searchText: string) {
    return this.http.get(`${this.apiUrl}/all-information/${topicId}?search=${searchText}`);
  }
}
