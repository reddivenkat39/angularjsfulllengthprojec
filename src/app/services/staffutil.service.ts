import { Injectable } from '@angular/core';

@Injectable()
export class StaffutilService {
backendUrl:String='http://localhost:8080';
  constructor() { }

  getToken(){

  }

  getBackendUrl(){
  return this.backendUrl
  }



}
