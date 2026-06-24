import { Injectable } from '@angular/core';
import { ValidatorService } from './tool/validator-service';
import { ErrorsService } from './tool/errors-service'

export interface RegistroUser {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmar_password: string;
  telefono: string;
  ciudad: string;
  estado: string;
  direccion: string;
  edad: number | null;
  curp: string;
  rfc: string;
  grado_estudios: 'Preparatoria' | 'Licenciatura' | 'Maestría' | 'Doctorado';
  terminos_condiciones: boolean;
}

export interface PerfilUsuarioUI {
  first_name: string;
  last_name: string;
  email: string;
  telefono: string;
  estado: string;
  ciudad: string;
  edad: number | null;

  // extras para UI
  codigo?: string;
  fecha_registro?: string; // ISO
  photoUrl?: string;
  rolEtiqueta?: string; // ej. "DOCENTE BUAP"
}

export type RegistroErrors = Partial<Record<keyof RegistroUser, string>>;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  /* =========================================================
     1) ESQUEMA (modelo base)
     ========================================================= */
  public esquemaUser(): RegistroUser {
    return {
      user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      telefono: '',
      ciudad: '',
      estado: '',
      direccion: '',
      edad: null,
      curp: '',
      rfc: '',
      grado_estudios: 'Licenciatura',
      terminos_condiciones: false
    };
  }

  public validarUsuario(user: RegistroUser): RegistroErrors {
    let error: any = {};

    console.log('(Servicio-Usuarios)')

    if(!this.validatorService.required(user["user_id"])) {
      error["user_id"] = this.errorService.required;
    }
    else if (!this.validatorService.regex(user.user_id, /^[a-zA-Z0-9]{8}$/)) {
      error.user_id = 'Debe ser alfanumérico de 8 caracteres.';
    }

    if(!this.validatorService.required(user["first_name"])) {
      error["first_name"] = this.errorService.required;
    }
    else if (!this.validatorService.wordsES(user.first_name)) {
      error.first_name = 'Solo se permiten letras.';
    }

    if(!this.validatorService.required(user["last_name"])) {
      error["last_name"] = this.errorService.required;
    }
    else if (!this.validatorService.wordsES(user.last_name)) {
      error.last_name = 'Solo se permiten letras.';
    }

    if(!this.validatorService.required(user["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.maxLen(user["email"], 40)){
      error["email"] = this.errorService.max;
    }else if (!this.validatorService.email(user['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!this.validatorService.required(user["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
    }
    else if (!this.validatorService.minLen(user.confirmar_password, 8)) {
      error.confirmar_password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if(!this.validatorService.required(user["password"])){
        error["password"] = this.errorService.required;
    }
    else if (!this.validatorService.minLen(user.password, 8)) {
      error.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if(!this.validatorService.required(user["telefono"])) {
      error["telefono"] = this.errorService.required;
    }
    else if (!this.validatorService.phoneMX(user.telefono)) {
      error.telefono = 'El teléfono debe contener 10 dígitos.';
    }

    if(!this.validatorService.required(user["ciudad"])) {
      error["ciudad"] = this.errorService.required;
    }

    if(!this.validatorService.required(user["estado"])) {
      error["estado"] = this.errorService.required;
    }

    if(!this.validatorService.required(user["direccion"])) {
      error["direccion"] = this.errorService.required;
    }

    if(!this.validatorService.required(user["edad"])) {
      error["edad"] = this.errorService.required;
    }
    else if (!this.validatorService.betweenNumber(user.edad, 18, 80)) {
      error.edad = 'La edad debe estar entre 18 y 80 años.';
    }

    if(!this.validatorService.required(user["curp"])){
      error["curp"] = this.errorService.required;
    }else if(!this.validatorService.minLen(user["curp"], 18)){
      error["curp"] = this.errorService.min;
    }

    if(!this.validatorService.required(user["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.minLen(user["rfc"], 12)){
      error["rfc"] = this.errorService.min;
    }else if(!this.validatorService.maxLen(user["rfc"], 13)){
      error["rfc"] = this.errorService.max;
    }

    if(!this.validatorService.required(user["grado_estudios"])) {
      error["grado_estudios"] = this.errorService.required;
    }

    if(!this.validatorService.accepted(user["terminos_condiciones"])) {
      error["terminos_condiciones"] = "Debes aceptar los terminos y condiciones";
    }

    return error;
  }

}
