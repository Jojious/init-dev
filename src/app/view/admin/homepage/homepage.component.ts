import { Component, OnInit, ViewChild } from '@angular/core';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { EmailEditor, TypeSalePage } from '@app/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services';
import { BuilderBlock } from '@builder.io/angular';
import { GetContentOptions } from '@builder.io/sdk';

@BuilderBlock({
  tag: 'custom-thing',
  name: 'Custom thing',
  inputs: [
    {
      name: 'name',
      type: 'string',
    },
  ],
})

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  htmlabout: EmailEditor[];
  htmlcontact: EmailEditor[];
  htmlservice: EmailEditor[];
  htmlproduct: EmailEditor[];
  htmlcodeabout: SafeHtml;
  htmlcodecontact: SafeHtml;
  htmlcodeservice: SafeHtml;
  htmlcodeproduct: SafeHtml;
  service = 'service_page';
  about = 'about_page';
  contact = 'contact_page';
  product = 'product_page';
  step = 0;
  user: string;
  data = {
    property: 'hello',
    fn: (text: string) => alert(text),
  };
  options: GetContentOptions = {
    cacheSeconds: 1
  };

  constructor(
    private salepageService: SalepageService,
    private sanitizer: DomSanitizer,
    private route: Router,
    private authenticationService: AuthenticationService
  ) {}

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
    this.user = this.authenticationService.currentUserValue.role;
    console.log(this.user);
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setupcode(code: string, type: string) {
    switch (type) {
      case 'about_page':
        this.htmlcodeabout = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      case 'contact_page':
        this.htmlcodecontact = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      case 'product_page':
        this.htmlcodeproduct = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      case 'service_page':
        this.htmlcodeservice = this.sanitizer.bypassSecurityTrustHtml(code);
        break;
      default:
        break;
    }
  }

  openEditor(type: TypeSalePage) {
    console.log(type);
    this.route.navigate(['/admin/adminseditor', type]);
  }
  onclick() {
    alert('TEst Edit');
  }
  load(event: any) {
    console.log('load', event);
  }

  error(event: any) {
    console.log('error', event);
  }
}
