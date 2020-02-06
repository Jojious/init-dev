import { Component, OnInit } from '@angular/core';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { Codehtml } from '@app/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-user-sale-page',
  templateUrl: './user-sale-page.component.html',
  styleUrls: ['./user-sale-page.component.scss']
})
export class UserSalePageComponent implements OnInit {

  dthtml: Codehtml[];
  htmlcode: SafeHtml;

  constructor(private salepageService: SalepageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.salepageService.getHtml().subscribe(data => {
      this.dthtml = data.map(e => {
        return {
          ...e.payload.doc.data() as {},
        } as Codehtml;
      });
      this.setupcode(this.dthtml[0].html);
    });
  }
  setupcode(code: string) {
    this.htmlcode = this.sanitizer.bypassSecurityTrustHtml(code);
  }
}
