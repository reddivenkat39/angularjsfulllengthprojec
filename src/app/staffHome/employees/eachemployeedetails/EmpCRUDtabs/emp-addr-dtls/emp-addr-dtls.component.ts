import {Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {EachemployeedetailsComponent} from "../../eachemployeedetails.component";
import {EmpDetailedViewComponent} from "../../../emp-detailed-view/emp-detailed-view.component";

@Component({
  selector: 'app-emp-addr-dtls',
  templateUrl: './emp-addr-dtls.component.html',
  styleUrls: ['./emp-addr-dtls.component.css']
})
export class EmpAddrDtlsComponent  implements OnInit  {

  @Input() fullEmpDtls ;

  ngOnInit(){
    console.log("EmpAddrDtlsComponent: ngOnInit: @Input  fullEmpDtls:", this.fullEmpDtls);

  }

  empAddrData={};




  constructor() { }



}
