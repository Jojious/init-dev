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
  selected: string;
  @ViewChild(EmailEditorComponent) emailEditor: any;
  salepage: Salepage[];
  constructor(private route: ActivatedRoute, private router: Router, private salepageService: SalepageService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.selected = params.username);
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
        createby: this.selected
      };
      this.update(list, this.selected);
    });
  }
  update(editor: EmailEditor, username: string) {
    this.salepageService.updateSalePageDesign(editor, username);
  }
}
