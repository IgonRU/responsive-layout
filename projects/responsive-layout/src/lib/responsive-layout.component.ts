import {Component, effect, ElementRef, Inject, input, Renderer2, ViewEncapsulation} from '@angular/core';
import {IgonResponsiveLayoutService} from "./responsive-layout.service";
import {DOCUMENT} from "@angular/common";
import {IgonResponsiveLayoutModes} from "./layout-modes.enum";

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

  mode = input<IgonResponsiveLayoutModes>(IgonResponsiveLayoutModes.FULL);

  mediaModeName = '';

  debugMode = true;

  constructor(@Inject(DOCUMENT) private document: Document,
              private ref: ElementRef,
              public responsiveService: IgonResponsiveLayoutService,
              private renderer: Renderer2) {
    if (this.debugMode) console.log('AppComponent constructor called!');
    this.setBodyMediaClass(this.responsiveService.currentMediaModeName());

    effect(
      () => {
        this.updateLayoutModeComponentClass(this.mode());
      }
    );

    this.responsiveService.mediaModeChange.subscribe(mode => this.setBodyMediaClass(mode));

  }

  setBodyMediaClass(mediaModeName: string): void {
    if (this.debugMode) console.log('AppComponent setBodyMediaClass: ', mediaModeName);
    this.renderer.removeClass(this.document.body, 'media-' + this.mediaModeName);
    this.mediaModeName = mediaModeName;
    this.renderer.addClass(this.document.body, 'media-' + this.mediaModeName);
  }

  updateLayoutModeComponentClass(mode: IgonResponsiveLayoutModes): void {
    console.log('AppComponent updateLayoutModeComponentClass mode: ', mode, this.ref);
    if (this.ref) {
      this.renderer.removeClass(this.ref.nativeElement, 'layout-' + IgonResponsiveLayoutModes.FULL);
      this.renderer.removeClass(this.ref.nativeElement, 'layout-' + IgonResponsiveLayoutModes.CARD);
      this.renderer.addClass(this.ref.nativeElement, 'layout-' + mode);
    }
  }

  showHeader(): boolean {
    return this.mode() === IgonResponsiveLayoutModes.FULL;
  }

  showFooter(): boolean {
    return this.mode() === IgonResponsiveLayoutModes.FULL;
  }
}
