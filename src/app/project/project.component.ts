import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() name: string;
  @Input() id: string;
  @Input() contributors: number;
  @Input() images: number;

  constructor() { }

  ngOnInit() {
  }

}
