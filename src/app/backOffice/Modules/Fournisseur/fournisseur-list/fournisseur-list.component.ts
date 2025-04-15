import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../services/fournisseur.service';
import { Fournisseur } from '../models/founisseur.model';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  searchText = '';
  showDeleteModal = false;
  selectedFournisseur: Fournisseur | null = null;
  editMode: { [key: number]: boolean } = {};
  editedFournisseur: Fournisseur | null = null;
  qrCodes: { [key: number]: string } = {};
    // Nouvelles stats
    activeFournisseurs = 0;
    recentFournisseurs = 0;
    topVille = '';

  currentPage = 1;
  itemsPerPage = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];
  maxVisiblePages = 5;

  // Stats
  totalFournisseurs = 0;
  withEmailCount = 0;
  withPhoneCount = 0;

  constructor(
    private fournisseurService: FournisseurService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.fournisseurService.getFournisseurs().subscribe({
      next: (fournisseurs: Fournisseur[]) => {
        this.fournisseurs = fournisseurs;
        this.calculateStats();
        this.generateQRCodes();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement:', err);
        this.errorMessage = 'Impossible de charger la liste des fournisseurs';
        this.isLoading = false;
      }
    });
  }

  calculateStats(): void {
    this.totalFournisseurs = this.fournisseurs.length;
    this.withEmailCount = this.fournisseurs.filter(f => f.email).length;
    this.withPhoneCount = this.fournisseurs.filter(f => f.numtel).length;
  
    // Statistiques basées uniquement sur les champs existants
    this.activeFournisseurs = this.fournisseurs.length; // Tous considérés comme actifs
  
    // Nombre de fournisseurs avec adresse complète (contient une virgule)
    this.recentFournisseurs = this.fournisseurs.filter(f => 
      f.adresse && f.adresse.includes(',')
    ).length;
  
    // Ville la plus commune (première partie avant virgule)
    const villes = this.fournisseurs.reduce((acc, f) => {
      if (f.adresse) {
        const ville = f.adresse.split(',')[0]?.trim() || 'Non spécifiée';
        acc[ville] = (acc[ville] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    this.topVille = Object.entries(villes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  }

  generateQRCodes(): void {
    this.fournisseurs.forEach((fournisseur) => {
      const qrData = JSON.stringify({
        id: fournisseur.idFournisseur,
        nom: fournisseur.nomFournisseur,
        adresse: fournisseur.adresse,
        email: fournisseur.email,
        telephone: fournisseur.numtel
      });

      QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' }, (err: Error | null | undefined, url: string) => {
        if (err) {
          console.error('Erreur lors de la génération du QR code:', err);
          return;
        }
        this.qrCodes[fournisseur.idFournisseur!] = url;
      });
    });
  }

  addFournisseur(): void {
    this.router.navigate(['dashboard/Fournisseur/form']);
  }

  startEdit(fournisseur: Fournisseur): void {
    this.editMode[fournisseur.idFournisseur!] = true;
    this.editedFournisseur = { ...fournisseur };
  }

  cancelEdit(id: number): void {
    this.editMode[id] = false;
    this.editedFournisseur = null;
  }

  saveEdit(fournisseur: Fournisseur): void {
    if (!this.editedFournisseur) return;

    this.isLoading = true;
    this.fournisseurService.updateFournisseur(fournisseur.idFournisseur!, this.editedFournisseur)
      .subscribe({
        next: (updated) => {
          const index = this.fournisseurs.findIndex(f => f.idFournisseur === updated.idFournisseur);
          if (index !== -1) {
            this.fournisseurs[index] = updated;
            this.calculateStats();
            const qrData = JSON.stringify({
              id: updated.idFournisseur,
              nom: updated.nomFournisseur,
              adresse: updated.adresse,
              email: updated.email,
              telephone: updated.numtel
            });
            QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' }, (err: Error | null | undefined, url: string) => {
              if (!err) {
                this.qrCodes[updated.idFournisseur!] = url;
              }
            });
          }
          this.editMode[fournisseur.idFournisseur!] = false;
          this.editedFournisseur = null;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Erreur lors de la mise à jour:', err);
          this.errorMessage = 'Échec de la mise à jour du fournisseur';
          this.isLoading = false;
        }
      });
  }

  confirmDelete(fournisseur: Fournisseur): void {
    this.selectedFournisseur = fournisseur;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedFournisseur = null;
  }

  deleteFournisseur(): void {
    if (!this.selectedFournisseur) return;

    this.isLoading = true;
    this.fournisseurService.deleteFournisseur(this.selectedFournisseur.idFournisseur!)
      .subscribe({
        next: () => {
          delete this.qrCodes[this.selectedFournisseur!.idFournisseur!];
          this.fournisseurs = this.fournisseurs.filter(
            f => f.idFournisseur !== this.selectedFournisseur?.idFournisseur
          );
          this.calculateStats();
          this.closeDeleteModal();
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Erreur suppression:', err);
          this.errorMessage = 'Échec de la suppression du fournisseur';
          this.isLoading = false;
        }
      });
  }

  generatePdf(fournisseur: Fournisseur): void {
    const doc = new jsPDF();

    const primaryColor = [0, 51, 102] as [number, number, number];
    const secondaryColor = [200, 200, 200] as [number, number, number];
    const textColor = [33, 33, 33] as [number, number, number];

    doc.setFont('helvetica', 'normal');

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Fiche Fournisseur', 20, 25);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.text(`Généré le ${new Date().toLocaleDateString()}`, 20, 35);

    const infoYStart = 60;
    doc.setFontSize(14);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('Détails du Fournisseur', 20, infoYStart);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nom: ${fournisseur.nomFournisseur || 'N/A'}`, 20, infoYStart + 10);
    doc.text(`Adresse: ${fournisseur.adresse || 'N/A'}`, 20, infoYStart + 20);
    doc.text(`Email: ${fournisseur.email || 'N/A'}`, 20, infoYStart + 30);
    doc.text(`Téléphone: ${fournisseur.numtel || 'N/A'}`, 20, infoYStart + 40);

    const qrCodeUrl = this.qrCodes[fournisseur.idFournisseur!];
    if (qrCodeUrl) {
      doc.addImage(qrCodeUrl, 'PNG', 150, infoYStart, 40, 40);
    } else {
      doc.setFontSize(10);
      doc.setTextColor(255, 0, 0);
      doc.text('QR Code non disponible', 150, infoYStart + 20);
    }

    doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setLineWidth(0.2);
    doc.line(20, infoYStart + 50, 190, infoYStart + 50);

    autoTable(doc, {
      startY: infoYStart + 60,
      head: [['ID', 'Nom', 'Email', 'Téléphone']],
      body: [
        [
          fournisseur.idFournisseur?.toString() || 'N/A',
          fournisseur.nomFournisseur || 'N/A',
          fournisseur.email || 'N/A',
          fournisseur.numtel?.toString() || 'N/A'
        ]
      ],
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        cellPadding: 4,
        font: 'helvetica',
        fontStyle: 'bold'
      },
      bodyStyles: {
        textColor: textColor,
        fontSize: 10,
        cellPadding: 4,
        font: 'helvetica',
        fontStyle: 'normal'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        lineColor: secondaryColor,
        lineWidth: 0.1
      },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 }
      }
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(9);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('helvetica', 'italic');
    doc.text('SmartDelivery - Gestion des Fournisseurs', 20, pageHeight - 20);
    doc.text(`Page 1`, 190, pageHeight - 20, { align: 'right' });

    doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setLineWidth(0.1);
    doc.line(20, pageHeight - 25, 190, pageHeight - 25);

    doc.save(`Fiche_Fournisseur_${fournisseur.nomFournisseur || 'fournisseur'}.pdf`);
  }

  exportToExcel(): void {
    const data = this.filteredFournisseurs.map(fournisseur => ({
      ID: fournisseur.idFournisseur || 'N/A',
      Nom: fournisseur.nomFournisseur || 'N/A',
      Adresse: fournisseur.adresse || 'N/A',
      Email: fournisseur.email || 'N/A',
      Téléphone: fournisseur.numtel || 'N/A'
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    worksheet['!cols'] = [
      { wch: 10 },
      { wch: 30 },
      { wch: 40 },
      { wch: 30 },
      { wch: 15 }
    ];

    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fournisseurs');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileName = `Fournisseurs_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const blob = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(blob, fileName);
  }

  get filteredFournisseurs(): Fournisseur[] {
    if (!this.searchText) {
      return this.fournisseurs;
    }
    return this.fournisseurs.filter(fournisseur =>
      fournisseur.nomFournisseur?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      fournisseur.adresse?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      fournisseur.email?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      fournisseur.numtel?.toString().includes(this.searchText)
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
  }

  get paginatedFournisseurs(): Fournisseur[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFournisseurs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFournisseurs.length / this.itemsPerPage);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

    if (end - start + 1 < this.maxVisiblePages) {
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredFournisseurs.length);
  }
}