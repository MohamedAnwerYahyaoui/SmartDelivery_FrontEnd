import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RepasService} from "../../service/repas.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Repas } from '../../models/repas.model';


@Component({
  selector: 'app-repas-form',
  templateUrl: './repas-form.component.html',
  styleUrls: ['./repas-form.component.css']
})
export class RepasFormComponent implements OnInit {
  repasForm: FormGroup;
  isEditMode = false;
  repasId?: number;

  constructor(
    private fb: FormBuilder,
    private repasService: RepasService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.repasForm = this.fb.group({
      nom: ['', Validators.required],
      desc: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.repasId = +params['id'];
        this.loadRepas(this.repasId);
      }
    });
  }

  loadRepas(id: number): void {
    this.repasService.getAllRepas().subscribe(repasList => {
      const repas = repasList.find(r => r.id === id);
      if (repas) {
        this.repasForm.patchValue(repas);
      }
    });
  }

  onSubmit(): void {
    if (this.repasForm.valid) {
      const repasData: Repas = this.repasForm.value;

      if (this.isEditMode && this.repasId) {
        this.repasService.updateRepas(this.repasId, repasData).subscribe({
          next: () => this.router.navigate(['/repas']),
          error: (err) => console.error('Error updating repas:', err)
        });
      } else {
        this.repasService.createRepas(repasData).subscribe({
          next: () => this.router.navigate(['/repas']),
          error: (err) => console.error('Error creating repas:', err)
        });
      }
    }
  }
}