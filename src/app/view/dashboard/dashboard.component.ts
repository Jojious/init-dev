import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { Codehtml, Member, Role } from '@app/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '@app/components/homepage/dialog-box/dialog-box.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['username', 'tel', 'line', 'recomment', 'status', 'action'];
  dtMember: Member[];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dthtml: Codehtml[];
  htmlcode: SafeHtml;
  constructor(private salepageService: SalepageService, private sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.salepageService.getHtml().subscribe(data => {
      this.dthtml = data.map(e => {
        return {
          ...e.payload.doc.data() as {},
        } as Codehtml;
      });
      this.setupcode(this.dthtml[0].html);
    });
    this.salepageService.getMemberAll().subscribe(data => {
      this.dataSource.data = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {},
        };
      }) || [];
      console.log(this.dataSource.data);
    });
  }
  setupcode(code: string) {
    this.htmlcode = this.sanitizer.bypassSecurityTrustHtml(code);
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
}
