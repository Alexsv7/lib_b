import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `
    <ul class="nav nav-pills nav-stacked" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
      <li class="bullet-center" role="presentation" class="active"><a class="logo" href="books"><i
        class="glyphicon glyphicon-book gi-4x">Libi</i></a></li>
      <li class="bullet-center" role="presentation"><a routerLink="books">My books</a></li>
      <li class="bullet-center" role="presentation"><a routerLink="wishlist">Wishlist</a></li>
      <li class="bullet-center">
        <button type="button" class="btn btn-success"><a routerLink="add-book"><i class="glyphicon glyphicon-plus"></i></a></button>
      </li>
      <!--<li><file-picker></file-picker></li>-->
      <!--<li>-->
        <!--<file-uploader></file-uploader>-->
      <!--</li>-->
    </ul>`,
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
