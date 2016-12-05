import {Directive, ElementRef} from '@angular/core';
import {RoleAccessService} from "./role-access.service";
import {LoginComponent} from "../users/login/login.component";

@Directive({
  selector: '[role-restrict]'
})
export class RoleRestrictDirective {
  constructor(private roleAccessService: RoleAccessService, private _elementRef: ElementRef, private loginComponent: LoginComponent) {}

  ngOnInit() {
    this.roleRestrict();
  }

  private roleRestrict(): void {
    let accessDenied: boolean = false;

    let roles = this._elementRef.nativeElement.attributes.allow.nodeValue.split(' ');

    // you can check for default roles such as an admin here
    //if(this.roleAccessService.user.role.toLowerCase().trim() === 'admin') return;

    for (let role of roles)
      if (role.toLowerCase().trim() === this.roleAccessService.user.admin.toLowerCase().trim() )
        accessDenied = true;
      else if(role.toLowerCase().trim() === this.loginComponent.getDetailsByLogin.userRole.toLowerCase().trim()){
        accessDenied = true;
      }


    if (!accessDenied) {
      let el: HTMLElement = this._elementRef.nativeElement;
      el.parentNode.removeChild(el);
    }
  }
}
