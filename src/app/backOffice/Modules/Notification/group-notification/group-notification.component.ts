import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppNotification } from '../models/AppNotification';
import { GroupNotification } from '../models/GroupNotification';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-group-notification',
  templateUrl: './group-notification.component.html',
  styleUrls: ['./group-notification.component.css']
})
export class GroupNotificationComponent implements OnInit {
  groupNotificationForm: FormGroup;
  submittedNotifications: AppNotification[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.groupNotificationForm = this.fb.group({
      template: ['', Validators.required],
      notifications: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addNotification(); // Ajoute une notification par défaut
  }

  get notifications(): FormArray {
    return this.groupNotificationForm.get('notifications') as FormArray;
  }

  addNotification(): void {
    const notificationGroup = this.fb.group({
      nomClient: ['', Validators.required],
      data: this.fb.group({
        key: [''],
        value: ['']
      })
    });
    this.notifications.push(notificationGroup);
  }

  removeNotification(index: number): void {
    this.notifications.removeAt(index);
  }

  onSubmit(): void {
    if (this.groupNotificationForm.invalid) {
      this.errorMessage = 'Veuillez compléter le formulaire correctement.';
      return;
    }

    const formValue = this.groupNotificationForm.value;
    const groupNotif: GroupNotification = {
      template: formValue.template,
      notifications: formValue.notifications.map((notif: any) => {
        const data: { [key: string]: string } = {};
        if (notif.data.key && notif.data.value) {
          data[notif.data.key] = notif.data.value;
        }
        return {
          nomClient: notif.nomClient,
          data: data
        };
      })
    };

    this.notificationService.sendGroupNotifications(groupNotif).subscribe(
      (data) => {
        this.submittedNotifications = data;
        this.successMessage = 'Notifications envoyées avec succès !';
        this.errorMessage = '';
        this.groupNotificationForm.reset();
        // Réinitialise le FormArray
        while (this.notifications.length !== 0) {
          this.notifications.removeAt(0);
        }
        this.addNotification();
      },
      (error: any) => {
        this.errorMessage = 'Erreur lors de l\'envoi des notifications.';
        this.successMessage = '';
        console.error(error);
      }
    );
  }
}