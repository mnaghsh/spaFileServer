import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class evaluationDiscrepanciesReportsService {

  constructor(public configService: ConfigService) { }


  // public selectAllEvaluationDiscrepanciesReports():Observable<any>{
  //   return this.configService.get('evaluationDiscrepanciesReports');
  // }
  //this.userId ? this.userId : "",
  // public selectEvaluationDiscrepanciesReports(period): Observable<any> {
  //   return this.configService.get('evaluationDiscrepanciesReports/' + Date.now()+','+ Date.now() + ',' + period);
  // }
  // public selectEvaluationDiscrepanciesReportsByDate(fromDate,toDate,period): Observable<any> {
  //   return this.configService.get('evaluationDiscrepanciesReports/' + fromDate.toString()+','+ toDate.toString()+ ',' + period);
  // }
 
  public filterEvaluationDiscrepanciesReportsByAssessor(body):Observable<any>{
    return this.configService.post('evaluationDiscrepanciesReports/evaluationDiscrepanciesReportByAssessorSp',body);
  }

  public filterEvaluationDiscrepanciesReportsByLocation(body):Observable<any>{
    return this.configService.post('evaluationDiscrepanciesReports/evaluationDiscrepanciesReportByLocationSp',body);
  }

  public filterEvaluationDiscrepanciesReportsByCheckList(body):Observable<any>{
    return this.configService.post('evaluationDiscrepanciesReports/evaluationDiscrepanciesReportByChecklistSp',body);
  }


  // public updateEvaluationDiscrepanciesReports(id,body):Observable<any>{
  //   return this.configService.put('evaluationDiscrepanciesReports/'+id,body);
  // }
  // public deleteEvaluationDiscrepanciesReports(id):Observable<any>{
  //   return this.configService.delete('evaluationDiscrepanciesReports/'+id);
  // }

}
