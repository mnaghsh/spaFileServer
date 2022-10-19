import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class SendSpechializedErgonomiToAssessorService {

  constructor(public configService:ConfigService) { }

  public insertSpechializedErgonomis(body):Observable<any>{
    return this.configService.post('HseESpechializedErgonomis',body);
  }
  
}
