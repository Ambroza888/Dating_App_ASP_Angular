import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  constructor() { }

  ngOnInit() {
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
