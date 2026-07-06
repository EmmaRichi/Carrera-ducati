import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
/* ===== Partials standalone ===== */
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego-terminado-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp,
  ],
  templateUrl: './juego-terminado-screen.html',
  styleUrl: './juego-terminado-screen.scss',
})
export class JuegoTerminadoScreen {

  /* =========================================================
     DRAWER / SIDEBAR
     ========================================================= */

  /** Controla opciones del sidebar */
  public isLogin = true;

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

  /** Útil si en algún momento desea bloquear CTA */
  public isLoading = false;

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
  public goInicio(): void {
    this.router.navigate(['/app', 'home']);
  }

}
