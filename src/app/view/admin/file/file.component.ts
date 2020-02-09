import { Component, OnInit } from '@angular/core';
import { SalepageService } from '@app/services/nosql/salepage.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  file: any;

  constructor(private service: SalepageService) {}

  ngOnInit() {}

  handing(event: { target: { files: any[] } }) {
    this.file = event.target.files[0];
  }

  upload() {
    this.service.uploadFile(this.file);
  }
}
