import { Component, OnInit } from '@angular/core';

declare global {
  interface Document {
    monetization?: any;
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public monetization = false;

  constructor() { }

  ngOnInit() {
    if (document.monetization && document.monetization.state === 'pending') {
      this.monetization = true;
    }
  }
}
