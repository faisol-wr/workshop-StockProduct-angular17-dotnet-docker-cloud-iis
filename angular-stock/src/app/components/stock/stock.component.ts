import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatTableDataSource,
} from '@angular/material/table';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';

// Import ProductService
import { ProductService } from '../../services/product.service';

// Import Environment
import { environment } from '../../../environments/environment';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../create-product-dialog/create-product-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { AlertDialogConfirmComponent } from '../alert-dialog-confirm/alert-dialog-confirm.component';
import { DatePipe } from '@angular/common';

// Import JSPDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatIcon,
    MatFormField,
    MatSuffix,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatInput,
    FormsModule,
    DecimalPipe,
    SlicePipe,
    MatIconButton,
    MatButton,
  ],
  providers: [DatePipe],
})
export class StockComponent implements OnInit {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private datePipe = inject(DatePipe);

  // Image URL
  imageUrl = environment.dotnet_api_url_image;
  dataSource = new MatTableDataSource<Record<string, string>>();
  searchValue = '';
  searchTerm = new Subject<string>();

  page = 1;
  limit = 100;
  selectedCategory = '';
  searchQuery = '';

  // Columns for Table
  displayedColumns = [
    'productID',
    'productPicture',
    'productName',
    'unitPrice',
    'unitInStock',
    'categoryName',
    'action',
  ];

  // Pagination
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // Method getProducts
  getProducts() {
    this.productService
      .getAllProducts(
        this.page,
        this.limit,
        this.selectedCategory,
        this.searchQuery
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          this.dataSource.data = result.products;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  // Method ngOnInit
  ngOnInit(): void {
    // ดึงข้อมูลสินค้า
    this.getProducts();
  }

  // Method ngAfterViewInit
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Method onClickAddProduct
  async onClickAddProduct() {
    // เรียกเปิด dialog สำหรับเพิ่มสินค้า
    const dialogAddRef = await this.dialog.open(CreateProductDialogComponent, {
      width: `600px`,
    });

    dialogAddRef.componentInstance.productCreated.subscribe((created) => {
      if (created) {
        this.getProducts();
      }
    });
  }

  // Method onClickEdit
  async onClickEdit(product: any) {
    const dialogEditRef = await this.dialog.open(EditProductDialogComponent, {
      width: '600px',
      data: product,
    });

    dialogEditRef.componentInstance.productUpdated.subscribe((updated) => {
      if (updated) {
        this.getProducts();
      }
    });
  }

  // Method Delete Product
  async onClickDelete(id: any) {
    await this.dialog
      .open(AlertDialogConfirmComponent, {
        data: {
          title: 'ยืนยันการลบสินค้า',
          subtitle: 'คุณต้องการลบสินค้านี้ใช่หรือไม่?',
          confirmText: 'ยืนยันลบ',
          cancelText: 'ยกเลิก',
          confirmAction: () => {
            console.log('Product deleted! ' + id);

            this.productService.deleteProduct(id).subscribe({
              next: (result) => {
                // console.log(result)
                this.dataSource.data = this.dataSource.data.filter(
                  (product: any) => product.productid !== id
                );
              },
              error: (error) => {
                console.error(error);
              },
            });

            this.dataSource.data = this.dataSource.data.filter(
              (product: any) => product.productid !== id
            );
          },
        },
      })
      .afterClosed();
  }

  // Method filter product
  async doFilter(event: any) {
    // // do something
    this.dataSource.filter = event.target.value.trim();
  }

  // Method clear search
  clearSearch() {
    this.searchValue = '';
    this.searchTerm.next('');
    this.dataSource.filter = '';
  }

  // Export to PDF
  onClickExportPDF() {
    console.log('Init Export PDF');
    const unit = 'pt';
    const size = 'A4'; // Use A3, A4, A5, etc.
    const orientation = 'portrait'; // portrait or landscape
    const marginLeft = 40; // Left padding

    const font: any =
      environment.fontToExport;

    var callAddFont = function (this: any) {
      this.addFileToVFS('Kanit-Regular-normal.ttf', font);
      this.addFont('Kanit-Regular-normal.ttf', 'Kanit-Regular', 'normal');
    };

    jsPDF.API.events.push(['addFonts', callAddFont]);

    // New PDF Instance
    const doc: any = new jsPDF(orientation, unit, size);

    // Set font
    doc.setFont('Kanit-Regular');

    // Set font size
    doc.setFontSize(14);

    // Set the document title with date
    const title = `รายงานสินค้า - ${new Date().toLocaleDateString()}`;

    // Set the table headers
    const headers = [['#', 'Product', 'Category', 'Price', 'Unit', 'Created']];

    const data = this.dataSource.data.map((product: any, index: number) => [
      index + 1,
      product.productname || '',
      product.categoryname || '',
      product.unitprice != null ? `$${product.unitprice.toFixed(2)}` : 'N/A',
      product.unitinstock != null ? product.unitinstock : 'N/A',
      product.createddate
        ? this.datePipe.transform(product.createddate, 'dd/MM/yyyy')
        : 'N/A',
    ]);

    // Set the table options
    doc.autoTable({
      head: headers,
      body: data,
      startY: 60,
      theme: 'grid',
      margin: { top: 60, right: 40, bottom: 20, left: 40 },
      styles: { font: 'Kanit-Regular', fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 100 },
        3: { cellWidth: 80 },
        4: { cellWidth: 40 },
        5: { cellWidth: 80 },
      },
    });

    // Set the document title
    doc.text(title, marginLeft, 40);

    // Set the document page number
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${totalPages}`, 500, 800);
    }

    // PDF name as datetime
    const pdfName = `products-report-${new Date().toISOString()}.pdf`;

    // Save the PDF
    doc.save(pdfName);
  }

  // Export the CSV file
  onClickExportCSV() {
    const csvRow = [];
    const header = ['ID', 'Product', 'Category', 'Price', 'Unit', 'Created'];
    csvRow.push(header.join(','));

    this.dataSource.data.map((product: any, index: number) => {
      const row = [
        index + 1,
        `"${product.productname.replace(/"/g, '""')}"`,
        `"${product.categoryname.replace(/"/g, '""')}"`,
        product.unitprice,
        product.unitinstock,
        this.datePipe.transform(product.createddate, 'dd/MM/yyyy'),
      ];
      csvRow.push(row.join(','));
    });

    const csvString = csvRow.join('\n');
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvString], {
      type: 'text/csv;charset=utf-8;',
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.setAttribute('download', `products-${new Date().toISOString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
