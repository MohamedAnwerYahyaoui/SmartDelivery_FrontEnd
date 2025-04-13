import { Component, OnInit } from '@angular/core';
import { Commande, Status } from 'src/app/backOffice/Modules/Commande/models/Commande.model';
import { CommandeService } from 'src/app/backOffice/Modules/Commande/commande.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {
  commande: Commande = {
    mantantTotal: 0,
    dateLiv: '',
    status: Status.nonLivrée
  };
  statusOptions = Object.values(Status);
  isEditMode = false;
  id: number | null = null;

  constructor(
    private commandeService: CommandeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEditMode = true;
      this.loadCommande();
    }
  }

  loadCommande(): void {
    this.commandeService.getCommandes().subscribe(data => {
      const commande = data.find(c => c.idCommande === this.id);
      if (commande) {
        this.commande = {
          ...commande,
          dateLiv: new Date(commande.dateLiv).toISOString().split('T')[0]
        };
      }
    });
  }

  saveCommande(): void {
    const commandeToSave: Commande = {
      ...this.commande,
      dateLiv: new Date(this.commande.dateLiv)
    };

    if (this.isEditMode && this.id) {
      this.commandeService.updateCommande(this.id, commandeToSave).subscribe(() => {
        this.router.navigate(['dashboard/commande/list']);
      });
    } else {
      this.commandeService.createCommande(commandeToSave).subscribe(() => {
        this.router.navigate(['dashboard/commande/list']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['dashboard/commande/list']);
  }
}