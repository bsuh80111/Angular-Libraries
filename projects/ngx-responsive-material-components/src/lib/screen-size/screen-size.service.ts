import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService implements OnDestroy {

  private breakpointSubscription: Subscription;
  private breakpoints: Record<string, boolean> = {};

  get isMobile() { return this.breakpoints[Breakpoints.Small] || this.breakpoints[Breakpoints.XSmall] };
  get isMedium() { return this.breakpoints[Breakpoints.Medium] }
  get isLarge() { return this.breakpoints[Breakpoints.Large] };
  get isXLarge() { return this.breakpoints[Breakpoints.XLarge] };

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointSubscription = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(
      distinctUntilChanged()
    ).subscribe({
      next: ({ breakpoints }) => {
        this.breakpoints = { ...breakpoints };
      }
    });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }
}
