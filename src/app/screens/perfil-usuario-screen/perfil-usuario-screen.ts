import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { HeaderApp } from '../../partials/header-app/header-app';
import { LeftSidebar } from '../../partials/left-sidebar/left-sidebar';
import { FooterApp } from '../../partials/footer-app/footer-app';
import { UsuariosService, RegistroUser } from '../../services/usuarios-service';

@Component({
  selector: 'app-perfil-usuario-screen',
  imports: [
    ...SHARED_IMPORTS,
    HeaderApp,
    LeftSidebar,
    FooterApp,
  ],
  templateUrl: './perfil-usuario-screen.html',
  styleUrl: './perfil-usuario-screen.scss',
})
export class PerfilUsuarioScreen implements OnInit {

  public user: RegistroUser;
  public fechaRegistro?: string;
  public isLogin = true;
  public drawerOpen = false;
  public estados: Array<{ value: number; viewValue: string }> = [
    { value: 1, viewValue: 'Aguascalientes' },
    { value: 2, viewValue: 'Baja California' },
    { value: 3, viewValue: 'Baja California Sur' },
    { value: 4, viewValue: 'Campeche' },
    { value: 5, viewValue: 'Chiapas' },
    { value: 6, viewValue: 'Chihuahua' },
    { value: 7, viewValue: 'Ciudad de México' },
    { value: 8, viewValue: 'Coahuila' },
    { value: 9, viewValue: 'Colima' },
    { value: 10, viewValue: 'Durango' },
    { value: 11, viewValue: 'Estado de México' },
    { value: 12, viewValue: 'Guanajuato' },
    { value: 13, viewValue: 'Guerrero' },
    { value: 14, viewValue: 'Hidalgo' },
    { value: 15, viewValue: 'Jalisco' },
    { value: 16, viewValue: 'Michoacán' },
    { value: 17, viewValue: 'Morelos' },
    { value: 18, viewValue: 'Nayarit' },
    { value: 19, viewValue: 'Nuevo León' },
    { value: 20, viewValue: 'Oaxaca' },
    { value: 21, viewValue: 'Puebla' },
    { value: 22, viewValue: 'Querétaro' },
    { value: 23, viewValue: 'Quintana Roo' },
    { value: 24, viewValue: 'San Luis Potosí' },
    { value: 25, viewValue: 'Sinaloa' },
    { value: 26, viewValue: 'Sonora' },
    { value: 27, viewValue: 'Tabasco' },
    { value: 28, viewValue: 'Tamaulipas' },
    { value: 29, viewValue: 'Tlaxcala' },
    { value: 30, viewValue: 'Veracruz' },
    { value: 31, viewValue: 'Yucatán' },
    { value: 32, viewValue: 'Zacatecas' }
  ];
  public grados: Array<{ value: string; viewValue: string }> = [
    { value: '1', viewValue: 'Preparatoria' },
    { value: '2', viewValue: 'Licenciatura' },
    { value: '3', viewValue: 'Maestría' },
    { value: '4', viewValue: 'Doctorado' },
  ];

  constructor(
    private readonly usuariosService: UsuariosService,
  ) {
    this.user = this.usuariosService.esquemaUser();
  }

  ngOnInit(): void {
    // Intentar leer usuario guardado en localStorage
    const raw = localStorage.getItem('usuario_registrado');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // Merge con esquema para evitar campos undefined
        this.user = { ...this.usuariosService.esquemaUser(), ...parsed };
      } catch (e) {
        this.user = this.usuariosService.esquemaUser();
      }
    }

    const f = localStorage.getItem('fecha_registro');
    if (f) this.fechaRegistro = f;
  }

  public fullName(): string {
    return `${this.user.first_name || ''} ${this.user.last_name || ''}`.trim();
  }

  public getEstadoLabel(): string {
    // user.estado puede ser el nombre o un índice numérico (guardado desde registro)
    const raw = this.user.estado as any;
    const num = Number(raw);
    if (!Number.isFinite(num) || Number.isNaN(num)) {
      // si no es numérico, devolver el valor tal cual o guion
      return (this.user.estado && this.user.estado !== '') ? String(this.user.estado) : '-';
    }

    const found = this.estados.find(e => e.value === num);
    return found ? found.viewValue : '-';
  }

  public getGradoLabel(): string {
    const raw = this.user.grado_estudios as any;
    const str = String(raw || '').trim();

    // Si el valor ya es una etiqueta legible, devolverla
    const foundByLabel = this.grados.find(g => g.viewValue === str);
    if (foundByLabel) return foundByLabel.viewValue;

    // Si el valor es el índice (por ejemplo '1' o 1), buscar por value
    const found = this.grados.find(g => g.value === str);
    if (found) return found.viewValue;

    // Si user.grado_estudios ya contiene el texto directo (ej. 'Licenciatura')
    if (str.length > 0) return str;
    return '-';
  }

  public toggleSidebar(): void {
    this.drawerOpen = !this.drawerOpen;
  }

  public closeSidebar(): void {
    this.drawerOpen = false;
  }

}
