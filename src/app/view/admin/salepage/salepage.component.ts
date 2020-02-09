import { Component, OnInit, Inject } from '@angular/core';
import { SalePage } from '@app/models';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthenticationService } from '@app/services';

@Component({
  selector: 'app-salepage',
  templateUrl: './salepage.component.html',
  styleUrls: ['./salepage.component.scss']
})
export class SalepageComponent implements OnInit {
  salepages: SalePage[] = [];
  user: string;
  constructor(private saleservice: SalepageService, private route: Router, public dialog: MatDialog,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.saleservice.getAllSalePage().subscribe(value => {
      this.salepages = value.map(v => {
        return {
          ...(v.payload.doc.data() as SalePage)
        };
      });
    });
    this.user = this.authenticationService.currentUserValue.role;
  }
  action(type: string, value: SalePage) {
    switch (type) {
      case 'view':
        this.openDialog(value);
        break;
      case 'edit':
        this.route.navigate(['/admin/salePageEditor', value.owner]);
        break;

      default:
        break;
    }
  }

  openDialog(value: SalePage) {
    this.dialog.open(DialogDataExampleDialog, {
      data: value
    });
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogDataExampleDialog implements OnInit {
  htmlcode: SafeHtml;
  ngOnInit(): void {
    this.htmlcode = this.sanitizer.bypassSecurityTrustHtml(this.data.html);
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: SalePage, private sanitizer: DomSanitizer) {}

}
