import { Component } from '@angular/core';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../model/Promotion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})
export class AddPromotionComponent {
  promotionForm: FormGroup;

  constructor(
    private promotionService: PromotionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.promotionForm = this.fb.group({
      description: ['', Validators.required],
      offre: ['', Validators.required],
      prix: ['', Validators.required],
    });
  }

  addPromotion():void {
    if (this.promotionForm.valid) {
      this.promotionService.addPromotion(this.promotionForm.value).subscribe({
        next: (data: any) => {
          console.log('Promotion added successfully:', data);
          this.router.navigate(['/dashboard/promotion/list']);
        },
        error: (error) => {
          console.error('Error adding promotion:', error);
        }
      });
    }
  }

  ngOnInit(): void {

    // Initialization logic if needed
  }
}