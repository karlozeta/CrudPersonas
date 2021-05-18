
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from './servicios/personas/personas.service'
import { RolesService } from './servicios/roles/roles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaForm: FormGroup;
  personas: any;
  roles: any;

  opcionesValues = ['Si', 'No'];

  constructor(
    // public personaForm: FormGroup,
    public fb: FormBuilder,
    public personasService: PersonasService,
    public rolesService: RolesService

  ) {
  }

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
      activo: ['', Validators.required]
    })

    this.rolesService.getAllRoles().subscribe(res => {
      this.roles = res;
    },
      error => {
        console.error(error)
      });

    this.personasService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => console.error(error)
    )
  }

  guardar(): void {
    for (let index = 0; index < this.personas.length; index++) {
      if (this.personas[index].nombre === this.personaForm.value.nombre){
        alert("El usuario ya existe");
        this.personaForm.reset();
      }
    }
    this.personasService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      this.personas = this.personas.filter((persona: any) => resp.id !== persona.id);
      this.personas.push(resp);
    },
      error => console.error(error)
    )
  }

  eliminar(persona: any){
    this.personasService.deletePersona(persona.id).subscribe(resp => {
      if (resp === true){
        this.personas.pop(persona);
      }
    })
  }

  editar(persona: any){
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      rol: persona.rol,
      activo: persona.activo  
    });
  }

  limpiar(){
    this.personaForm.reset();
  }
}
