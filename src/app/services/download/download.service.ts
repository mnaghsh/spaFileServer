import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(public configService: ConfigService) { }

  public selectListOfcheckLists(): Observable<any> {
    return this.configService.get('HseECheckLists');
  }
  public getListOfFilesWithUserId(UserId): Observable<any> {
    return this.configService.get('Download/GetListFile?userId=' + UserId);
  }
  public downloadFileWithUserIdAndFilename(fileName,UserId): Observable<any> {
    return this.configService.get('Download/downloadFile?fileName='+fileName+'&userId=' + UserId,{
    responseType: 'blob'
  });
  }
  public deleteFileWithUserIdAndFilename(fileName,UserId): Observable<any> {
    return this.configService.get('Delete/Delete?fileName='+fileName+'&userId=' + UserId);
  }


  public insertListOfcheckLists(body): Observable<any> {
    return this.configService.post('HseECheckLists', body);
  }

  public updateListOfcheckLists(id, body): Observable<any> {
    return this.configService.put('HseECheckLists/' + id, body);
  }
  public deleteListOfcheckLists(id): Observable<any> {
    return this.configService.delete('HseECheckLists/' + id);
  }

}
