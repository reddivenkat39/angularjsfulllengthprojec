import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Project} from "./Project.interface";
import {ProjectService} from "./project.service";
import {Sow} from "./sow.interface";
import {SowInvoices} from "./sowinvoices.interface";
import {ToastsManager} from "ng2-toastr";
declare var $: any;
@Component({
  selector     : 'app-projects',
  templateUrl  : './projects.component.html',
  styleUrls    : ['./projects.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements OnInit {
  private isProjectsTab = false;
  private isSowTab = false;
  viewSOWDetails={};

  // used to get all the projects
  allProjects: Project[];

  // used to get all the sows
  allSows: Sow[];

// used to get the invoices by sownum
  allSOWInvoices:SowInvoices[]=[];
  closedInvoices:SowInvoices[]=[];
  openInvoices: SowInvoices[]=[];
  selectedSowRow:Sow;
  // used to get the invoices by sownum by selecting the row
  selectedSowInvoice:SowInvoices;

  // used to get the invoices individual amounts by sownum
  allInvsAmnt:number=0;
  openInvsAmnt:number=0;
  closedInvsAmnt: number=0;


// reused varaibles in header names, header amounts, filtered invoices
  filteredInvoices: SowInvoices[] =[];
  tableHeader: string ='';
  tableInvAmt: number=0;


  constructor(private projectService: ProjectService, private toastManager:ToastsManager ) {
  }

  /*
  on loading page getting the projects data
   */
  ngOnInit() {
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    this.loadProjectsData();

  }

  /*
    loading  projects data
   */
  loadProjectsData() {
    this.isProjectsTab = true;
    this.isSowTab = false;
    this.projectService.getProjectsData().subscribe(
      res => {
        if (res.datares != null) {
          console.log("loadprojectsdata datares  :", res.datares);
          this.allProjects = res.datares;
        } else if (res.successres != null) {
          console.log("loadprojectsdata successres  :", res.successres);
        } else if (res.errorres != null) {
          console.log("loadprojectsdata errorres  :", res.errorres);
        } else {
          console.log("Server problem no Reponse found from Server");
        }
      }
    );
  }

  /*
    loading all sow data
   */
  loadSowData() {
    this.isSowTab = true;
    this.isProjectsTab = false;
    this.loadAllSowData();
  }

  defaultFirstRowSelect() {
    //default first row selection
    console.log("defaultFirstRowSelect :selectedSowInvoice", this.selectedSowInvoice );
    this.selectedSowRow = this.allSows[0];
    this.OnClickSowInvoiceTabs();
  }

  OnClickSowInvoiceTabs(){
    this.onRowSelect(this.selectedSowRow.sowNum);
  }



/*
to load all sow data
 */
  loadAllSowData(){
    this.projectService.getSowData().subscribe(
      res => {
        if (res.datares != null) {
          console.log("load sow data datares  :", res.datares);
          this.allSows = res.datares;
          this.defaultFirstRowSelect();
        } else if (res.errorres != null) {
          console.log("load sow data errorres  :", res.errorres);
        } else if (res.successres != null) {
          console.log("load sow data successres  :", res.successres);
        } else {
          console.log("server problem");
        }
      }
    );
  }

  onRowSelect(sowNum){
    /*console.log("sowNum is ....: ",selectedSowInvoice.sowNum);*/

    this.allInvsAmnt=0;
    this.closedInvsAmnt=0;
    this.openInvsAmnt=0;
   /* this.viewSOWDetails.venName   = selectedSowInvoice.venName;
    this.viewSOWDetails.sowNum  = selectedSowInvoice.sowNum;*/
    this.projectService.getSowInvoices(sowNum).subscribe(
      res => {
        if (res.datares != null && res.errorres==null) {
          console.log("sow invoices data datares  :", res.datares);
          this.allSOWInvoices = res.datares;
          this.viewSOWDetails=res.datares[0];
          // todo actually it is in array anyway "same client and sowNum for all invoices"
          for (let i = 0; i < this.allSOWInvoices.length; i++) {
            this.allInvsAmnt += this.allSOWInvoices[i].invAmt;
          }
          this.openInvoices =[];
          this.closedInvoices =[];
          res.datares.filter(row => {
            if (row.invStatus == "OPEN") {//fill open invoices

              this.openInvsAmnt += row.invAmt;
              console.log("vendor openinvamount is :",this.openInvsAmnt);
              this.openInvoices.push(row);
              console.log("vendor openinvoices are :",this.openInvoices);
            }else if(row.invStatus == "CLOSED") {//fill close invoices
              this.closedInvsAmnt += row.invAmt;
              console.log("vendor closedInvsAmnt is :",this.closedInvsAmnt);
              this.closedInvoices.push(row);
              console.log("vendor closedInvoices is :",this.closedInvoices);
            }

          });

        } else{
          console.log("response for sowNum not found ", res.errorres);
          this.allSOWInvoices=[];
          this.openInvoices =[];
          this.closedInvoices =[];
          this.viewSOWDetails=[];

          console.log('Error for SOW Data',res.errores);
        }
        this.loadFilteredData('OPEN');
      }

    );

  }


  loadFilteredData(filter : string){
    switch(filter)
    {
      case "All" :
        this.filteredInvoices = this.allSOWInvoices;
        this.tableHeader = "All Invoices";
        this.tableInvAmt=this.allInvsAmnt;
        console.log("Filtered invoices : All:", this.filteredInvoices);
        break;

      case "OPEN" :
        this.filteredInvoices = this.openInvoices;
        this.tableHeader = "Open Invoices";
        this.tableInvAmt=this.openInvsAmnt;
        console.log("Filtered invoices: Open:", this.filteredInvoices);
        break;

      case "CLOSE" :
        this.filteredInvoices = this.closedInvoices;
        this.tableHeader = "Close Invoices";
        this.tableInvAmt=this.closedInvsAmnt;
        console.log("Filtered invoices : Close :", this.filteredInvoices);
        break;

    }
  }

}
