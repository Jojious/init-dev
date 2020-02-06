// dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { Status } from '@app/models';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  action: string;
  localdata: any;
  items = [
    {value: Status.Inactive, viewValue: 'Inactive'},
    {value: Status.Active, viewValue: 'Active'}
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData,
    private salepageService: SalepageService
  ) {
    console.log(data);
    this.localdata = { ...data };
    this.action = this.localdata.action;
  }

  doAction() {
    this.salepageService.updateMember(String(this.data.id), this.localdata);
    this.dialogRef.close({ event: this.action, data: this.localdata });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
