import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { Member } from '@app/models';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '@app/components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-checkregister',
  templateUrl: './checkregister.component.html',
  styleUrls: ['./checkregister.component.scss']
})
export class CheckregisterComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'tel',
    'line',
    'email',
    'recomment',
    'status',
    'action'
  ];
  dtMember: Member[];
  dataSource = new MatTableDataSource([]);

  constructor(
    private salepageService: SalepageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.salepageService.getMemberAll().subscribe(data => {
      this.dataSource.data =
        data.map(e => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as {})
          };
        }) || [];
    });
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        console.log('add');
      } else if (result.event === 'Update') {
        console.log('update');
      } else if (result.event === 'Delete') {
        console.log('delete');
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
