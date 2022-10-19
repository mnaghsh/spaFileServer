import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfScheduling():Observable<any>{
    return this.configService.get('HseChecklistSchedulings');
  }
  // public selectListOfQuestionsOfCheckList(HecliECheckListId):Observable<any>{
  //   return this.configService.get('HseECheckListQuestions/GetHseECheckListQuestionsOfChecklist/'+HecliECheckListId);
  // }
  
  public insertListOfScheduling(body):Observable<any>{
    return this.configService.post('HseChecklistSchedulings',body);
  }
  
  public updateListOfScheduling(id,body):Observable<any>{
    return this.configService.put('HseChecklistSchedulings/'+id,body);
  }
  public deleteListOfScheduling(id):Observable<any>{
    return this.configService.delete('HseChecklistSchedulings/'+id);
  }

}
