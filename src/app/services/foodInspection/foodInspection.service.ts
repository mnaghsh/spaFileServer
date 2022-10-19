import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class FoodInspectionService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfHseFoodInspections():Observable<any>{
    return this.configService.get('HseFoodInspections');
  }

  public insertListOfHseFoodInspections(body):Observable<any>{
    return this.configService.post('HseFoodInspections',body);
  }
  
  public updateListOfHseFoodInspections(id,body):Observable<any>{
    return this.configService.put('HseFoodInspections/'+id,body);
  }
  public deleteListOfHseFoodInspections(id):Observable<any>{
    return this.configService.delete('HseFoodInspections/'+id);
  }

}
