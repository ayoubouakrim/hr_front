import {Component, EventEmitter, Output} from '@angular/core';
import {LayoutService} from "../../../shared/service/layout/layout.service";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './app-top-bar-component.component.html',
  styleUrl: './app-top-bar-component.component.css'
})
export class AppTopBarComponentComponent {

  constructor(protected layoutService:LayoutService) {
  }

  @Output()
  toggleSidebar= new EventEmitter<void>();

  onMenuClick() {
    this.toggleSidebar.emit();
  }
}
