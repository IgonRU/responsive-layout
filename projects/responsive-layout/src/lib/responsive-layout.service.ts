import { Injectable, EventEmitter } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class IgonResponsiveLayoutService {

  mediaMode: string | null = null;
  mediaModeChange: EventEmitter<string> = new EventEmitter<string>();

  debugMode = true;

  constructor(public breakpointObserver: BreakpointObserver) {
    if (this.debugMode) console.log('IgonResponsiveLayoutService constructor called!');

    this.observeMediaBreakpoints([
      Breakpoints.XSmall
    ], (breakpoint) => {
      this.setMediaModeName(Breakpoints.Handset);
    });

    this.observeMediaBreakpoints([
      Breakpoints.Small,
      Breakpoints.Medium
    ], (breakpoint) => {
      this.setMediaModeName(Breakpoints.Tablet);
    });

    this.observeMediaBreakpoints([
      Breakpoints.Large,
      Breakpoints.XLarge
    ], (breakpoint) => {
      this.setMediaModeName(Breakpoints.Web);
    });
  }

  observeMediaBreakpoints(breakpoints: string[], callback: (breakpoint: string) => void): void {
    this.breakpointObserver
      .observe(breakpoints)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          if (this.debugMode) console.log(
            'observeMediaBreakpoints Matches: ', state
          );
          callback(Breakpoints.Handset);
        }
      });
  }

  setMediaModeName(mediaModeName: string): void {
    this.mediaMode = mediaModeName;
    this.mediaModeChange.emit(this.currentMediaModeName());
  }

  isHandset(): boolean {
    return this.mediaMode == Breakpoints.Handset;
  }

  isTablet(): boolean {
    return this.mediaMode == Breakpoints.Tablet;
  }

  isWeb(): boolean {
    return this.mediaMode == Breakpoints.Web;
  }

  currentMediaModeName(): string {
    let result = 'web';

    if (this.isHandset()) {
      result = 'handset';
    }

    if (this.isTablet()) {
      result = 'tablet';
    }

    return result;
  }
}
