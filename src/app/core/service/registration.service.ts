import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistrationData } from '../model/registration-data';
const URL = "http://127.0.0.1:4567";

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  // registrations$: Observable<RegistrationData> = this.http.get<RegistrationData>(`${URL}/posts`);
  userId = new BehaviorSubject(null);
  userId$ = this.userId.asObservable();

  constructor(private http: HttpClient) {}

  // saveRegistration(formValue: RegistrationData): Observable<RegistrationData> {
  //   console.log(this.http.post<RegistrationData>(`${URL}`, formValue));
  //   return this.http.post<RegistrationData>(`${URL}`, formValue);
  // }

  updateUserId(userId: string): void {
    this.userId.next(userId);
  }

  saveRegistration(
    formValue: RegistrationData,
    userId?: string
  ): Observable<RegistrationData> {
    if (!userId) {
      return this.http.post<RegistrationData>(`${URL}/posts`, formValue); //add new data.
    }
    return this.http.put<RegistrationData>(`${URL}/posts/${userId}`, formValue); //update data.
  }

  getRegistration(id: string): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${URL}/posts/${id}`);
  }

  getRegistrations(): Observable<RegistrationData> {
    return this.http.get<RegistrationData>(`${URL}/posts`);
  }
}
