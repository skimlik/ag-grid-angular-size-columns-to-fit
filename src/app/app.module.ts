import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

import { AgGridModule } from "ag-grid-angular";
import "ag-grid-enterprise";
import { ColumnsFactoryService } from './columns-factory.service';
import { DataService } from './data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [AppComponent],
  providers: [ColumnsFactoryService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
