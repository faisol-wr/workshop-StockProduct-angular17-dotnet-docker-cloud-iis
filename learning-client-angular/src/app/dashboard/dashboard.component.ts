import { Component, inject } from '@angular/core'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  // สร้างตัวแปรไว้เก็บข้อมูลสินค้า
  products: any = []

  private productService = inject(ProductService)

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data)
        this.products = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}