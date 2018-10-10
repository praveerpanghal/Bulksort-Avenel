import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class XmlDataService {
  constructor(private http: Http) { } 
  // url='assets/38606_3528803_mp.xml';
  url="../../assets/Product_Catalog.xml"
  getXML(): Observable<any> {
    return this.http.get(this.url)
    // .map((res: Response) => res)
    .map(this.extractData)
    .catch((error: any) => Observable.throw(error || "server error"));
  }
  private extractData(res: Response) {
    let body = res.text();
          return body || {};
      }
}
