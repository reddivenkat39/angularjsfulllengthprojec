import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Project} from "./Project.interface";
import {ProjectService} from "./project.service";
import {Sow} from "./sow.interface";
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

  allProjectsData: Project[];
  allSowData: Sow[];


  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {

    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    this.loadProjectsData();

  }

  loadProjectsData() {
    this.isProjectsTab = true;
    this.isSowTab = false;
    this.projectService.getProjectsData().subscribe(
      res => {
        if (res.datares != null) {
          console.log("loadprojectsdata datares  :", res.datares);
          this.allProjectsData = res.datares;
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

  loadSowData() {
    this.isSowTab = true;
    this.isProjectsTab = false;
    this.projectService.getSowData().subscribe(
      res => {
        if (res.datares != null) {
          console.log("load sow data datares  :", res.datares);
          this.allSowData = res.datares;
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

}
