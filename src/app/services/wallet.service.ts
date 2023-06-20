import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
export interface VCReply{
  selectedVcList:any[],
  state:string,
  redirectUri:string  
}
export interface ECResponse{
  selectableVcList:[],
  state:string,
  redirectUri:string  
}
@Injectable({
  providedIn: 'root'
})
export class WalletService {


  constructor(private http:HttpClient,private storageService:StorageService) { }


  public executeContent(url:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Origin': '*',
      'Authorization': ''+this.storageService.get('token')})
    const options = { headers: headers, redirect : 'follow',responseType: 'text' as 'json' };
    return this.http.post(
      environment.base_url + '/api/execute-content', 
      {"qr_content":url},options)
    }

  public executeVC(_VCReply:VCReply): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Control-Allow-Origin': '*',
      'Authorization': ''+this.storageService.get('token')})

    return this.http.post(
      environment.base_url + '/api/vp',_VCReply,
      { headers: headers, responseType: 'text'}
    )
    }
  public getAll():Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*',
        'Authorization': ''+this.storageService.get('token')})

      const options = { headers: headers, redirect : 'follow' };
      return this.http.get(
        environment.base_url + '/api/personal-data-space', 
        options)
    }
    public getOne(data: string) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Allow-Control-Allow-Origin': '*',
        'Authorization': ''+this.storageService.get('token')})

      const options = { headers: headers, redirect : 'follow' };
      return this.http.get(
        environment.base_url + '/api/vc/1/'+data+'/format?format=vc_json', 
        options)
    }  
}
