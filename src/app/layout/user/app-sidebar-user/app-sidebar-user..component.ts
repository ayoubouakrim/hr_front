import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {LayoutService} from "../../../shared/service/layout/layout.service";


@Component({
  selector: 'app-sidebar-user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './app-sidebar-user..component.html',
  styleUrl: './app-sidebar-user..component.css'
})
export class AppSidebarUserComponent {
  constructor(protected layoutService : LayoutService) {
  }
}
