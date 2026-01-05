import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private getUrl ='https://localhost:7084/api/Employee/GetEmployee';
  private deleteurl='https://localhost:7084/api/Employee';
  private inserturl='https://localhost:7084/api/Employee/InsertEmployee';
  private updateurl="https://localhost:7084/api/Employee";
  constructor(private http: HttpClient) {}

  getEmp():Observable<any>{
    return this.http.get(this.getUrl);
  }

  
  
insertemp(employee:any)
{
  return this.http.post(`${this.inserturl}`,employee);
}
deleteEmp(id:any)
{
  return this.http.delete(`${this.deleteurl}/${id}`);
}
updateEmp(id: any, employee: any):Observable<any>
{
return this.http.put(`${this.deleteurl}/${id}`,employee);
}
}