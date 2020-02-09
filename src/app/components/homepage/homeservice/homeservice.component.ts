import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { EmailEditor, TypeSalePage } from '@app/models';

@Component({
  selector: 'app-homeservice',
  templateUrl: './homeservice.component.html',
  styleUrls: ['./homeservice.component.scss']
})
export class HomeserviceComponent implements OnInit {
  html: SafeHtml;
  dthtml: EmailEditor[];
  constructor(private sanitizer: DomSanitizer, private salepageService: SalepageService) { }

  ngOnInit() {
    this.salepageService.getAdminEditor('service_page').subscribe(data => {
      this.dthtml = data.map(e => {
        return {
          ...(e.payload.doc.data() as {})
        } as EmailEditor;
      });
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.dthtml[0].html);
    });
  }

}
