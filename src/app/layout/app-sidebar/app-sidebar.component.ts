import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css'
})
export class AppSidebarComponent {
  expandSidebar: boolean = true;

  toggleSidebar() {
    this.expandSidebar = !this.expandSidebar;
  }
}
