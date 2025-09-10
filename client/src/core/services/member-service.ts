import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member, Photo } from '../../types/member';
// import { AccountServices } from './account-services';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http=inject(HttpClient);
  // private accountservices=inject(AccountServices);
  private baseUrl=environment.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl+'members'); //, this.getHttpOptions()
  }
  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl+'members/'+id ); //, this.getHttpOptions()
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(this.baseUrl+'members/'+id+'/photos' ); //, this.getHttpOptions()
  }
  // private getHttpOptions() {
  //   return {
  //     headers: new HttpHeaders({ 
  //       Authorization: 'Bearer ' + this.accountservices.currentUser()?.token
  //     })
  //   };
  // }
}
