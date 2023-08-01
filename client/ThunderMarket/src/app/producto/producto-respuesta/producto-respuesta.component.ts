import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-producto-respuesta',
  templateUrl: './producto-respuesta.component.html',
  styleUrls: ['./producto-respuesta.component.css']
})
export class ProductoRespuestaComponent {

}
