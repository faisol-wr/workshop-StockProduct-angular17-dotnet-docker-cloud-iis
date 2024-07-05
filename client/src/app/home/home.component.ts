import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private meta = inject(Meta);

  ngOnInit(): void {
    this.meta.addTags([
      {
        name: 'title',
        content: 'Stock Management | Home',
      },
      {
        name: 'description',
        content:
          'Stock Management is a web applicantion that allows users to manage their stock inventory.',
      },
      {
        name: 'keywords',
        content: 'stock, management, inventory, web application',
      },
    ]);
  }
}
