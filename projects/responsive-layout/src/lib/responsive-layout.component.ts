import {Component, Inject, Renderer2, ViewEncapsulation} from '@angular/core';
import {IgonResponsiveLayoutService} from "./responsive-layout.service";
import {DOCUMENT} from "@angular/common";

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

  constructor(@Inject(DOCUMENT) private document: Document,
              public responsiveService: IgonResponsiveLayoutService,
              private renderer: Renderer2) {
    if (this.debugMode) console.log('AppComponent constructor called!');
    this.setBodyMediaClass(this.responsiveService.currentMediaModeName());
    this.responsiveService.mediaModeChange.subscribe(mode => this.setBodyMediaClass(mode));
  }

  setBodyMediaClass(mediaModeName: string): void {
    if (this.debugMode) console.log('AppComponent setBodyMediaClass: ', mediaModeName);
    this.renderer.removeClass(this.document.body, 'media-' + this.mediaModeName);
    this.mediaModeName = mediaModeName;
    this.renderer.addClass(this.document.body, 'media-' + this.mediaModeName);
  }
}
