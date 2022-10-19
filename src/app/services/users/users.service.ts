import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public configService:ConfigService) { }


  public selectAllUsers():Observable<any>{
    return this.configService.get('users');
  }
  public selectOneUser(HecliECheckListId):Observable<any>{
    return this.configService.get('users/'+HecliECheckListId);
  }
  
  public insertUsers(body):Observable<any>{
    return this.configService.post('users',body);
  }
  
  public updateUsers(id,body):Observable<any>{
    return this.configService.put('users/'+id,body);
  }
  public deleteUsers(id):Observable<any>{
    return this.configService.delete('users/'+id);
  }

}
