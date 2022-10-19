import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(public configService:ConfigService) { }


  public selectAllListOflocations():Observable<any>{
    return this.configService.get('HseSLocations');
  }
  // public selectListOfQuestionsOfCheckList(HecliECheckListId):Observable<any>{
  //   return this.configService.get('HseECheckListQuestions/GetHseECheckListQuestionsOfChecklist/'+HecliECheckListId);
  // }
  
  public insertListOflocations(body):Observable<any>{
    return this.configService.post('HseSLocations',body);
  }
  
  public updateListOflocations(id,body):Observable<any>{
    return this.configService.put('HseSLocations/'+id,body);
  }
  public deleteListOflocations(id):Observable<any>{
    return this.configService.delete('HseSLocations/'+id);
  }

}
