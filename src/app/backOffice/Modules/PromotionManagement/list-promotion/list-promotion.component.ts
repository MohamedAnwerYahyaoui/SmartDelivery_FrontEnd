import { Component } from '@angular/core';
import { PromotionService } from '../services/promotion.service';
import { Promotion } from '../model/Promotion';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent {
promotions: Promotion[]=[];

  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.promotionService.getPromotion().subscribe((data: any) => {
      this.promotions=data;
      console.log(data);
    })
  }
  deletePromotion(id: number): void {
    this.promotionService.deletePromotion(id).subscribe(() => {
      this.promotions = this.promotions.filter(p => p.id !== id);
    });
  }
}