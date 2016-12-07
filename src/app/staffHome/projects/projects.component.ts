import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Project} from "./Project.interface";
import {ProjectService} from "./project.service";
declare var $: any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements OnInit {
  private allProjects=false;
  selectedProject:Project;
  allTabnerProjects:Project[];
  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    this.allProjects=true;
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    this.projectService.getProjects().then(allTabnerProjects => this.allTabnerProjects = allTabnerProjects);

  }
  onProjectsClicked(){
    this.allProjects=true;
  }
  onSowClicked(){

  }

}
