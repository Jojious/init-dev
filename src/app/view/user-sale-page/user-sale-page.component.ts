import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { EmailEditor, TypeSalePage } from '@app/models';
@Component({
  selector: 'app-user-sale-page',
  templateUrl: './user-sale-page.component.html',
  styleUrls: ['./user-sale-page.component.scss']
})
export class UserSalePageComponent implements OnInit {
  htmlabout: EmailEditor[];
  htmlcontact: EmailEditor[];
  htmlservice: EmailEditor[];
  htmlproduct: EmailEditor[];
  htmlsalepage: EmailEditor[];
  htmlcodeabout: SafeHtml;
  htmlcodecontact: SafeHtml;
  htmlcodeservice: SafeHtml;
  htmlcodeproduct: SafeHtml;
  htmlcodesalepage: SafeHtml;
  paramservice: string;
  paramabout: string;
  paramcontact: string;
  paramproduct: string;
  paramsalepage: string;

  constructor(private salepageService: SalepageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.salepageService.getAdminEditor('about_page').subscribe(data => {
      this.htmlabout = data.map(e => {
        return {
          ...(e.payload.doc.data() as {})
        } as EmailEditor;
      });
      this.setupcode(this.htmlabout[0].html, 'about_page');
    });
    this.salepageService.getAdminEditor('contact_page').subscribe(data => {
      this.htmlcontact = data.map(e => {
        return {
          ...(e.payload.doc.data() as {})
        } as EmailEditor;
      });
      this.setupcode(this.htmlcontact[0].html, 'contact_page');
    });
    this.salepageService.getAdminEditor('product_page').subscribe(data => {
      this.htmlproduct = data.map(e => {
        return {
          ...(e.payload.doc.data() as {})
        } as EmailEditor;
      });
      this.setupcode(this.htmlproduct[0].html, 'product_page');
    });
    this.salepageService.getAdminEditor('service_page').subscribe(data => {
      this.htmlservice = data.map(e => {
        return {
          ...(e.payload.doc.data() as {})
        } as EmailEditor;
      });
      this.setupcode(this.htmlservice[0].html, 'service_page');
    });
    this.salepageService.getsalepageowner('wisa').subscribe(data => {
      this.htmlsalepage = data.map(e => {
        return {
          ...(e.payload.doc.data() as {})
        } as EmailEditor;
      });
      this.setupcode(this.htmlcodesalepage[0].html, 'sale_page');
    });
  }
  setupcode(code: string, type: string) {
    switch (type) {
      case 'about_page':
        this.paramabout = code;
        this.htmlcodeabout = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      case 'contact_page':
        this.paramcontact = code;
        this.htmlcodecontact = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      case 'product_page':
        this.paramproduct = code;
        this.htmlcodeproduct = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      case 'service_page':
        this.paramservice = code;
        this.htmlcodeservice = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
        case 'sale_page':
          this.paramsalepage = code;
          this.htmlcodesalepage = this.sanitizer.bypassSecurityTrustHtml(code);
          break;
      default:
        break;
    }
  }
}
