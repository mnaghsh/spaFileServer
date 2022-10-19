import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class HseTypeOfFoodsService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfHseTypeOfFoods():Observable<any>{
    return this.configService.get('HseTypeOfFoods');
  }

  public insertListOfHseTypeOfFoods(body):Observable<any>{
    return this.configService.post('HseTypeOfFoods',body);
  }
  
  public updateListOfHseTypeOfFoods(id,body):Observable<any>{
    return this.configService.put('HseTypeOfFoods/'+id,body);
  }
  public deleteListOfHseTypeOfFoods(id):Observable<any>{
    return this.configService.delete('HseTypeOfFoods/'+id);
  }

}
