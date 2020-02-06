import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { Salepage, Codehtml } from '@app/models';

@Component({
  selector: 'app-salepage',
  templateUrl: './salepage.component.html',
  styleUrls: ['./salepage.component.scss']
})
export class SalepageComponent implements OnInit {
  @ViewChild(EmailEditorComponent, {static: true})
  private emailEditor: EmailEditorComponent;
  salepage: Salepage[];
  constructor(private salepageService: SalepageService) {}

  ngOnInit() {
    this.salepageService.getDesign().subscribe(data => {
      this.salepage = data.map(e => {
        return {
          ...e.payload.doc.data() as {},
        } as Salepage;
      });
      this.editorLoaded(this.salepage[0].design);
    });
  }
  editorLoaded(dtjson: string) {
    const json = JSON.parse(dtjson);
    this.emailEditor.loadDesign(json);
  }
  saveDesign() {
    this.emailEditor.saveDesign(design => {
      const list = {
        design: JSON.stringify(design),
        createby: 'Giogius'
      };
      this.update(list);
    });
  }
  exportHtml() {
    this.emailEditor.exportHtml((data) => {
      const list = {
        html: data['html'],
        createby: 'Giogius'
      };
      this.updatehtml(list);
    });
  }
  update(salepage: Salepage) {
    console.log(salepage);
    this.salepageService.updateDesign(salepage);
  }
  updatehtml(codehtml: Codehtml) {
    this.salepageService.updateHtml(codehtml);
  }
}
