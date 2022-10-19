import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class workbookReportService {

  constructor(public configService:ConfigService) { }


  public getReport(body):Observable<any>{
    return this.configService.post('workBookReport/getIndustrialWaste',body);
  }
  public getConfilicts(body):Observable<any>{
    return this.configService.post('workBookReport/GetConfilictsFromFarzin',body);
   }
   public getNrt(body):Observable<any>{
    return this.configService.post('workBookReport/GetNonRoutineTests',body);
  }


}
