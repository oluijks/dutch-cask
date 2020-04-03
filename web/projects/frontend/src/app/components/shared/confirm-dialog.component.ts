/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'dcwa-confirm-dialog',
  template: `
  <mat-dialog-content>
    <h1 mat-dialog-title>{{data.title}}</h1>
    <p>{{data.question}}</p>
  </mat-dialog-content>
  <div mat-dialog-actions>
    <button (click)="cancel()" mat-raised-button color="warn">CANCEL</button>
    <button (click)="ok()" mat-button>OK</button>
  </div>
  `,
})
export class ConfirmDialogComponent {
  /**
   * Default constructor.
   * @param  {MatDialogRef<any>} publicdialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  /**
   * @returns void
   */
  ok(): void {
    this.dialogRef.close(true);
  }
  /**
   * @returns void
   */
  cancel(): void {
    this.dialogRef.close(false);
  }
}
