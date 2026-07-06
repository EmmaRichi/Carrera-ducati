import { Component, HostListener } from '@angular/core';

import { SHARED_IMPORTS } from '../../shared/shared.imports';
/* ===== Partials standalone ===== */
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-look-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp,
  ],
  templateUrl: './nuevo-look-screen.html',
  styleUrl: './nuevo-look-screen.scss',
})
export class NuevoLookScreen {

  /* =========================================================
     DRAWER / SIDEBAR
     ========================================================= */

  /** Controla opciones del sidebar */
  public isLogin = true;

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

  /** Controla franja Licensed del footer (si su Footer lo usa) */
  public showLicensed = false;

  /* =========================================================
     ESTADO
     ========================================================= */

  /** Útil si en algún momento desea bloquear CTA */
  public isLoading = false;

  /* =========================================================
     RESPONSIVE (sin userAgent)
     ========================================================= */

  /** Breakpoint consistente con su patrón (tablet+) */
  private readonly MOBILE_MAX = 767;

  /** Cache del estado mobile para no recalcular en cada binding */
  private _isMobile = this.computeIsMobile();


  constructor(
    private readonly router: Router,
  ) { }

  /* =========================================================
     HEADER / SIDEBAR EVENTS
     ========================================================= */

  /** Evento emitido por Header */
  public toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  /** Evento emitido por Sidebar */
  public closeSidebar(): void {
    this.drawerOpen = false;
  }

  /* =========================================================
     NAVEGACIÓN
     ========================================================= */

  /**
   * CTA para ir a instrucciones (manteniendo su patrón de rutas).
   * Ajuste la ruta si su app usa otra convención.
   */
  public goInstrucciones(): void {
    this.router.navigate(['/app', 'instrucciones']);
  }

  /* =========================================================
     CLASES DE UI
     ========================================================= */

  /**
   * Equivalente a su isMobile() anterior, pero:
   * - sin userAgent
   * - estable, consistente, y fácil de mantener
   */
  public mobileClass(): string {
    return this._isMobile ? 'interior-mobile' : 'interior-normal';
  }

  @HostListener('window:resize')
  public onResize(): void {
    this._isMobile = this.computeIsMobile();
  }

  private computeIsMobile(): boolean {
    return window.matchMedia(`(max-width: ${this.MOBILE_MAX}px)`).matches;
  }

}
