import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {IgonResponsiveLayoutComponent} from "../../projects/responsive-layout/src/lib/responsive-layout.component";
import {PageHeaderComponent} from "./_layout/page-header/page-header.component";
import {PageFooterComponent} from "./_layout/page-footer/page-footer.component";
import {IgonResponsiveLayoutService} from "../../projects/responsive-layout/src/lib/responsive-layout.service";
import {IgonResponsiveLayoutModes} from "../../projects/responsive-layout/src/lib/layout-modes.enum";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IgonResponsiveLayoutComponent, PageFooterComponent, PageHeaderComponent],
  providers: [ IgonResponsiveLayoutService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  currentMediaMode: string = undefined;
  layoutMode: IgonResponsiveLayoutModes = IgonResponsiveLayoutModes.FULL;

  constructor(private responsiveService: IgonResponsiveLayoutService) {
    this.responsiveService.mediaModeChange
      .subscribe(
        (event) => {
          console.log('AppComponent responsiveService event', event);
          this.currentMediaMode = event;
        }
      );
  }

  ngOnInit(): void {
    this.currentMediaMode = this.responsiveService.currentMediaModeName();
  }

  layoutModeChanged(event): void {
    console.log('AppComponent layoutModeChanged', event, event.target.value);

    this.layoutMode = event.target.value;
  }
}
