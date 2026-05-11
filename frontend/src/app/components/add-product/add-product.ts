import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProductComponent {
  productForm: FormGroup;
  loading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    this.productForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      category: [data?.category || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      stock: [data?.stock || 0, [Validators.required, Validators.min(0)]],
      description: [data?.description || '']
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.loading = true;
      const request = this.isEditMode 
        ? this.productService.updateProduct(this.data._id, this.productForm.value)
        : this.productService.addProduct(this.productForm.value);

      request.subscribe({
        next: () => {
          this.snackBar.open(this.isEditMode ? 'Termék frissítve' : 'Termék hozzáadva', 'Bezárás', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.loading = false;
          this.snackBar.open(err.error.message || 'Hiba történt', 'Bezárás', { duration: 3000 });
        }
      });
    }
  }
}
