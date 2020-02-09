import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { Salepage, Codehtml, TypeSalePage , EmailEditor } from '@app/models';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  typeEditor: string;
  createby = 'Giogius';
  selected: string;
  @ViewChild(EmailEditorComponent, {static: false}) emailEditor: any;
  // private emailEditor: EmailEditorComponent;
  salepage: Salepage[];
  constructor(private route: ActivatedRoute, private router: Router, private salepageService: SalepageService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.selected = params.type);
    // this.salepageService.getDesign().subscribe(data => {
    //   this.salepage = data.map(e => {
    //     return {
    //       ...e.payload.doc.data() as {},
    //     } as Salepage;
    //   });
    //   this.editorLoaded(this.salepage[0].design);
    // });
  }
  editorLoaded(dtjson: string) {
    const json = JSON.parse(dtjson);
    this.emailEditor.loadDesign(json);
  }
  saveDesign = () => {
    this.emailEditor.exportHtml(data => {
      const list = {
        design: JSON.stringify(data['design']),
        html: data['html'],
        createby: 'Giogius'
      };
      this.update(list, this.selected);
    });
  }
  update(editor: EmailEditor, type: string) {
    this.salepageService.updateAdminEditor(editor, type);
  }
  updatehtml(codehtml: Codehtml) {
    this.salepageService.updateHtml(codehtml);
  }
}
