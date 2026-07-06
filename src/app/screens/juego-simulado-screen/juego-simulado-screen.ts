import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
/* ===== Partials standalone ===== */
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego-simulado-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
  ],
  templateUrl: './juego-simulado-screen.html',
  styleUrl: './juego-simulado-screen.scss',
})
export class JuegoSimuladoScreen {

  /** Controla opciones del sidebar */
  public isLogin = true;

  /** Controla apertura/cierre del drawer */
  public drawerOpen = false;

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
  public goJuegoTerminado(): void {
    this.router.navigate(['/app', 'juego-terminado']);
  }

}
