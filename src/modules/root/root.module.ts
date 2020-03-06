import { NgModule } from '@angular/core';
import { RootComponent } from './components/root/root.component';
import { RootRoutingModule } from './root.routes';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    RootRoutingModule
  ],
  bootstrap: [
    RootComponent
  ]
})
export class RootModule { }
