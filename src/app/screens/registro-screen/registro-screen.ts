import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { RegistroErrors, RegistroUser, UsuariosService } from '../../services/usuarios-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss',
})
export class RegistroScreen implements OnInit {

  /* =========================
     Estado
     ========================= */
  public user!: RegistroUser;
  public errors: RegistroErrors = {};
  public isLoading = false;

  /* Password */
  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';

  /* Edades */
  public edades: Array<{ value: number }> = [];

  //Para el select
  public estados: any[] = [
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

  public grados: any[] = [
    { value: '1', viewValue: 'Preparatoria' },
    { value: '2', viewValue: 'Licenciatura' },
    { value: '3', viewValue: 'Maestría' },
    { value: '4', viewValue: 'Doctorado' },
  ];

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();

    // Llenar el array de edades
    this.llenarArrayEdades();
  }

  private llenarArrayEdades(): void {
    // Igual a su lógica original (18..80)
    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  public terminosCondiciones(): void {
    // Aquí puede abrir modal / navegar / etc.
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

  public registrar(): void {
    if (this.isLoading) return;

    console.log('(Registro) Registro de usuario:', this.user);

    // 1) Validación centralizada en UsuariosService
    this.errors = this.usuariosService.validarUsuario(this.user);
    console.log('(Registro) Errores:', this.errors)

    // 2) Sin jQuery: si hay errores, se detiene
    if (Object.keys(this.errors).length > 0) return;

    // 3) Guardar en localStorage
    this.isLoading = true;

    try {
      // Guardar datos de usuario en localStorage
      localStorage.setItem('usuario_registrado', JSON.stringify(this.user));

      // Guardar fecha de registro
      const fechaRegistro = new Date().toISOString();
      localStorage.setItem('fecha_registro', fechaRegistro);

      console.log('(Registro) Datos guardados en localStorage');

      // Navegar a perfil del usuario después del registro
      setTimeout(() => {
        this.router.navigate(['/app', 'perfil-usuario']);
      }, 500);
    } catch (error) {
      console.error('Error al guardar datos:', error);
      alert('Error al registrar usuario. Por favor, intenta de nuevo.');
    } finally {
      this.isLoading = false;
    }
  }

  public goLogin(): void {
    this.router.navigate(['']); // ajuste según su app
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

}
