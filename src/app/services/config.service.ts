import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
baseUrl = 'https://localhost:44377/api/'
//baseUrl = 'http://93.126.21.21:7273/api/'
//baseUrl="http://192.168.18.117:8080/server/api/"
//baseUrl="http://172.19.1.37/server/api/"
//baseUrl = 'http://hse.msc.ir/server/api/'


  constructor(public http: HttpClient) {
  }

  public get(url: string, options?: any) {
    return this.http.get<any[]>(this.baseUrl + url, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete<any[]>(this.baseUrl + url, options);
  }

  public post(url: string, body, options?: any) {
    return this.http.post(this.baseUrl + url, body, options);
  }

  public put(url: string, body, options?: any) {
    return this.http.put(this.baseUrl + url, body, options);
  }

}
