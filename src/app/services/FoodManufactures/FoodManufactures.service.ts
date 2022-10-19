import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class FoodManufacturesService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfHseFoodManufactores():Observable<any>{
    return this.configService.get('HseFoodManufactures');
  }

  public insertListOfHseFoodManufactores(body):Observable<any>{
    return this.configService.post('HseFoodManufactures',body);
  }
  
  public updateListOfHseFoodManufactores(id,body):Observable<any>{
    return this.configService.put('HseFoodManufactures/'+id,body);
  }
  public deleteListOfHseFoodManufactores(id):Observable<any>{
    return this.configService.delete('HseFoodManufactures/'+id);
  }

}
