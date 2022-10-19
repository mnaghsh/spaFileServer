import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsOfZonesService {

  constructor(public configService:ConfigService) { }

  // public selectAllListOfChecklistAssesment():Observable<any>{
  //   return this.configService.get('HseEChecklistAssessments');
  // }
  // public selectListOfRequestOfCheckList(HecliECheckListId):Observable<any>{
  //   return this.configService.get('HseECheckListRequest/GetHseECheckListRequestOfChecklist/'+HecliECheckListId);
  // }
  
  // public selectAllListOfChecklistReport():Observable<any>{
  //   return this.configService.get('checklistReport');
  // }

  public FilterListLocationsOfZone(body):Observable<any>{
    return this.configService.post('locationsOfZones/FilterLocationsOfZone',body);
  }




  // public insertListOfChecklistAssesment(body):Observable<any>{
  //   return this.configService.post('HseEChecklistAssessments',body);
  // }
  
  // public updateListOfChecklistAssesment(id,body):Observable<any>{
  //   return this.configService.put('HseEChecklistAssessments/'+id,body);
  // }
  // public deleteListOfChecklistAssesment(id):Observable<any>{
  //   return this.configService.delete('HseEChecklistAssessments/'+id);
  // }


}
