import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class CheckListService {

  constructor(public configService:ConfigService) { }

public selectListOfcheckLists():Observable<any>{
  return this.configService.get('HseECheckLists');
}

public insertListOfcheckLists(body):Observable<any>{
  return this.configService.post('HseECheckLists',body);
}

public updateListOfcheckLists(id,body):Observable<any>{
  return this.configService.put('HseECheckLists/'+id,body);
}
public deleteListOfcheckLists(id):Observable<any>{
  return this.configService.delete('HseECheckLists/'+id);
}

}
