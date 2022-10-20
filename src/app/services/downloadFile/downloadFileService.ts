import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(public configService:ConfigService) { }

public download(url,body):Observable<any>{
  return this.configService.post(url,body,{
    responseType: 'blob'
  });
}

public getList(teacherCode):Observable<any>{
  
  let address="downloadFile/"+teacherCode
  return this.configService.get(address);
}

  // public download(url: string): Observable<Blob> {
  //   return this.configService.get(url, {
  //     responseType: 'blob'
  //   })
  // }
  
}
