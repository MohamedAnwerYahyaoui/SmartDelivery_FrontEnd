import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from '../services/fournisseur.service';
import { Fournisseur } from '../models/founisseur.model';

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css']
})
export class FournisseurFormComponent implements OnInit {
  fournisseurForm: FormGroup;
  isEditMode = false;
  fournisseurId?: number;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurService: FournisseurService
  ) {
    this.fournisseurForm = this.fb.group({
      nomFournisseur: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      adresse: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      numtel: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.fournisseurId = +params['id'];
        this.loadFournisseur(this.fournisseurId);
      }
    });
  }

  loadFournisseur(id: number): void {
    this.isLoading = true;
    this.fournisseurService.getFournisseurs().subscribe({
      next: (fournisseurs) => {
        const fournisseur = fournisseurs.find(f => f.idFournisseur === id);
        if (fournisseur) {
          this.fournisseurForm.patchValue({
            nomFournisseur: fournisseur.nomFournisseur,
            adresse: fournisseur.adresse,
            numtel: fournisseur.numtel.toString(),
            email: fournisseur.email
          });
        } else {
          this.errorMessage = 'Fournisseur non trouvé';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement:', err);
        this.errorMessage = 'Impossible de charger les données du fournisseur';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const fournisseur: Fournisseur = {
      nomFournisseur: this.fournisseurForm.value.nomFournisseur,
      adresse: this.fournisseurForm.value.adresse,
      numtel: +this.fournisseurForm.value.numtel,
      email: this.fournisseurForm.value.email
    };

    const operation = this.isEditMode && this.fournisseurId
      ? this.fournisseurService.updateFournisseur(this.fournisseurId, fournisseur)
      : this.fournisseurService.createFournisseur(fournisseur);

    operation.subscribe({
      next: () => {
        this.router.navigate(['dashboard/Fournisseur/list']);
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.errorMessage = this.isEditMode
          ? 'Échec de la mise à jour du fournisseur'
          : 'Échec de la création du fournisseur';
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['dashboard/Fournisseur/list']);
  }

  // Getters pour accès facile aux contrôles du formulaire
  get nomFournisseur() {
    return this.fournisseurForm.get('nomFournisseur');
  }

  get adresse() {
    return this.fournisseurForm.get('adresse');
  }

  get numtel() {
    return this.fournisseurForm.get('numtel');
  }

  get email() {
    return this.fournisseurForm.get('email');
  }
}