import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfzones():Observable<any>{
    return this.configService.get('zones');
  }
  // public selectListOfQuestionsOfCheckList(HecliECheckListId):Observable<any>{
  //   return this.configService.get('HseECheckListQuestions/GetHseECheckListQuestionsOfChecklist/'+HecliECheckListId);
  // }
  
  public insertListOfzones(body):Observable<any>{
    return this.configService.post('zones',body);
  }
  
  public updateListOfzones(id,body):Observable<any>{
    return this.configService.put('zones/'+id,body);
  }
  public deleteListOfzones(id):Observable<any>{
    return this.configService.delete('zones/'+id);
  }

}
