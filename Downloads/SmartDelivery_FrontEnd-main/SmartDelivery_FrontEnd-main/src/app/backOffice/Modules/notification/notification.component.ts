import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { AppNotification } from 'src/app/models/AppNotification';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationForm: FormGroup;
  submitted = false;
  message = '';
  editMode = false;
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.notificationForm = this.fb.group({
      nomClient: ['', Validators.required],
      contenu: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Vérifier si l'URL contient un paramètre d'ID pour l'édition
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.currentId = +id;
        this.loadNotification(this.currentId);
      }
    });
  }

  loadNotification(id: number): void {
    this.notificationService.getNotification(id).subscribe(
      (data: AppNotification) => {
        // Pré-remplir le formulaire avec la notification existante
        this.notificationForm.patchValue({
          nomClient: data.nomClient,
          contenu: data.contenu
        });
      },
      error => {
        this.message = 'Erreur lors du chargement de la notification pour modification';
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.notificationForm.invalid) {
      return;
    }
    
    const notificationData: AppNotification = {
      idNotification: this.editMode ? this.currentId : null,
      nomClient: this.notificationForm.value.nomClient,
      contenu: this.notificationForm.value.contenu,
      date: new Date(),
      read: false
    };

    if (this.editMode && this.currentId) {
      this.notificationService.updateNotification(this.currentId, notificationData)
        .subscribe(
          (data: AppNotification) => {
            this.message = 'Notification modifiée avec succès!';
            // Redirection vers la liste après modification
            this.router.navigate(['/dashboard/liste-notification']);
          },
          error => {
            this.message = 'Erreur lors de la modification de la notification';
          }
        );
    } else {
      this.notificationService.createNotification(notificationData)
        .subscribe(
          (data: AppNotification) => {
            this.message = 'Notification ajoutée avec succès!';
            this.notificationForm.reset();
            this.submitted = false;
            // Redirection vers la liste après ajout
            this.router.navigate(['/dashboard/liste-notification']);
          },
          error => {
            this.message = 'Erreur lors de l\'ajout de la notification';
          }
        );
    }
  }
}
