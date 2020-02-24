import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { EmailEditor, TypeSalePage, SalePage } from '@app/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('json', {static: false}) jsonElement?: ElementRef;
  htmlabout: EmailEditor[];
  htmlcontact: EmailEditor[];
  htmlservice: EmailEditor[];
  htmlproduct: EmailEditor[];
  htmlsalepage: SalePage[];
  htmlcodeabout: SafeHtml;
  htmlcodecontact: SafeHtml;
  htmlcodeservice: SafeHtml;
  htmlcodeproduct: SafeHtml;
  htmlcodesalepage: SafeHtml;
  paramsalepage: string;
  paramservice: string;
  paramabout: string;
  paramcontact: string;
  paramproduct: string;
  onfocus = 0;
  constructor(
    private sanitizer: DomSanitizer,
    private salepageService: SalepageService
  ) {}
  public form: Object = {components: []};
  onChange(event) {
    console.log(event.form);
  }
  ngOnInit() {
    // this.salepageService.getAdminEditor('about_page').subscribe(data => {
    //   this.htmlabout = data.map(e => {
    //     return {
    //       ...(e.payload.doc.data() as {})
    //     } as EmailEditor;
    //   });
    //   this.setupcode(this.htmlabout[0].html, 'about_page');
    // });
    // this.salepageService.getAdminEditor('contact_page').subscribe(data => {
    //   this.htmlcontact = data.map(e => {
    //     return {
    //       ...(e.payload.doc.data() as {})
    //     } as EmailEditor;
    //   });
    //   this.setupcode(this.htmlcontact[0].html, 'contact_page');
    // });
    // this.salepageService.getAdminEditor('product_page').subscribe(data => {
    //   this.htmlproduct = data.map(e => {
    //     return {
    //       ...(e.payload.doc.data() as {})
    //     } as EmailEditor;
    //   });
    //   this.setupcode(this.htmlproduct[0].html, 'product_page');
    // });
    // this.salepageService.getAdminEditor('service_page').subscribe(data => {
    //   this.htmlservice = data.map(e => {
    //     return {
    //       ...(e.payload.doc.data() as {})
    //     } as EmailEditor;
    //   });
    //   this.setupcode(this.htmlservice[0].html, 'service_page');
    // });
    // this.salepageService.getsalepageowner('wisa').subscribe(data => {
    //   this.htmlsalepage = data.map(e => {
    //     return {
    //       ...(e.payload.doc.data() as {})
    //     } as SalePage;
    //   });
    //   this.setupcode(this.htmlsalepage[0].html, 'salepage');
    // });
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
      case 'salepage':
        this.paramsalepage = code;
        this.htmlcodesalepage = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      default:
        break;
    }
  }
}
