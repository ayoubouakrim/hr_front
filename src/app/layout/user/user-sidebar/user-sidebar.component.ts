import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'user-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  expandSidebar: boolean = true;

  toggleSidebar() {
    this.expandSidebar = !this.expandSidebar;
  }
}
