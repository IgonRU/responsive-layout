import {Component, Renderer2, ViewEncapsulation} from '@angular/core';
import {IgonResponsiveLayoutService} from "./responsive-layout.service";

@Component({
  selector: 'igon-responsive-layout',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [],
  providers: [ IgonResponsiveLayoutService ],
  templateUrl: './responsive-layout.component.html',
  styleUrls: ['./styles/responsive-layout.scss']
})
export class IgonResponsiveLayoutComponent {

  mediaModeName = '';

  debugMode = true;

  constructor(public responsiveService: IgonResponsiveLayoutService,
              private renderer: Renderer2) {
    if (this.debugMode) console.log('AppComponent constructor called!');
    this.setBodyMediaClass(this.responsiveService.currentMediaModeName());
    this.responsiveService.mediaModeChange.subscribe(mode => this.setBodyMediaClass(mode));
  }

  setBodyMediaClass(mediaModeName: string): void {
    if (this.debugMode) console.log('AppComponent setBodyMediaClass: ', mediaModeName);
    this.renderer.removeClass(document.body, 'media-' + this.mediaModeName);
    this.mediaModeName = mediaModeName;
    this.renderer.addClass(document.body, 'media-' + this.mediaModeName);
  }
}
