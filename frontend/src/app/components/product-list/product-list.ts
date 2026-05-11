import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { AddProductComponent } from '../add-product/add-product';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['name', 'category', 'price', 'stock', 'createdAt', 'actions'];
  username: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.username = user.username;
        this.loadProducts();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products', err)
    });
  }

  openAddProductDialog(product?: any) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '450px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: any) {
    this.openAddProductDialog(product);
  }

  deleteProduct(product: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Törlés megerősítése',
        message: `Biztosan törölni szeretné a(z) "${product.name}" terméket?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product._id).subscribe({
          next: () => {
            this.snackBar.open('Termék törölve', 'Bezárás', { duration: 3000 });
            this.loadProducts();
          },
          error: (err) => {
            this.snackBar.open(err.error.message || 'Hiba történt a törlés során', 'Bezárás', { duration: 3000 });
          }
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
