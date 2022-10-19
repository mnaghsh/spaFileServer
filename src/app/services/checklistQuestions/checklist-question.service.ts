import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistQuestionService {

  constructor(public configService:ConfigService) { }


  public selectAllListOfcheckListsQuestions():Observable<any>{
    return this.configService.get('HseECheckListQuestions');
  }
  public selectListOfQuestionsOfCheckList(HecliECheckListId):Observable<any>{
    return this.configService.get('HseECheckListQuestions/GetHseECheckListQuestionsOfChecklist/'+HecliECheckListId);
  }
  
  public insertListOfcheckListsQuestions(body):Observable<any>{
    return this.configService.post('HseECheckListQuestions',body);
  }
  
  public updateListOfcheckListsQuestions(id,body):Observable<any>{
    return this.configService.put('HseECheckListQuestions/'+id,body);
  }
  public deleteListOfcheckListsQuestions(id):Observable<any>{
    return this.configService.delete('HseECheckListQuestions/'+id);
  }

}
