import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class RequestChecklistService {

  constructor(public configService:ConfigService) { }

  public selectAllListOfRequestCheckLists():Observable<any>{
    return this.configService.get('HseERequestChecklists');
  }
  // public selectListOfRequestOfCheckList(HecliECheckListId):Observable<any>{
  //   return this.configService.get('HseECheckListRequest/GetHseECheckListRequestOfChecklist/'+HecliECheckListId);
  // }
  public selectAllListOfRequestCheckListsReport():Observable<any>{
    return this.configService.get('requestChecklistReport');
  }

  public insertListOfRequestCheckLists(body):Observable<any>{
    return this.configService.post('HseERequestChecklists',body);
  }
  
  public updateListOfRequestCheckLists(id,body):Observable<any>{
    return this.configService.put('HseERequestChecklists/'+id,body);
  }
  public deleteListOfRequestCheckLists(id):Observable<any>{
    return this.configService.delete('HseERequestChecklists/'+id);
  }


}
