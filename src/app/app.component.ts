import { Component, OnInit } from "@angular/core";
import { ColumnsFactoryService } from "./columns-factory.service";
import { ColDef, GridReadyEvent, ColumnApi, GridApi } from 'ag-grid-community';
import { IEntity } from './entity';
import { DataService } from './data.service';
import { Subscription, Observable } from 'rxjs';
import { flatMap, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "my-app",
  styleUrls: ["app.component.css"],
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  private dataSubscription = Subscription.EMPTY;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private dataSnapshotId = 1;

  private rowData: IEntity[] = [];
  private columnDefs: ColDef[];
  private defaultColDef: ColDef;
  private message: string = 'Note, columns are not sized to fit the screen, we call sizeColumnsToFit on firstDataRendered event. This is ok, we don\'t have any data yet';

  constructor(
    private readonly columnFactory: ColumnsFactoryService,
    private readonly dataService: DataService
  ) {
    this.rowData = [];
    this.columnDefs = columnFactory.create();
    this.defaultColDef = {
      resizable: true
    }
  }

  ngOnInit(): void {
    const dataSource$ = Observable.create(observer => {
      observer.next(this.dataSnapshotId);
    }).pipe(
      distinctUntilChanged(),
      flatMap(id => this.dataService.get(id))
    );

    this.dataSubscription = dataSource$.subscribe(data => this.rowData = data);
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params): void {
    params.api.sizeColumnsToFit();
  }

  changeRowSource(): void {
    this.message = "Try to change row data one more time";
    this.dataSnapshotId = this.dataSnapshotId ? 0 : 1;
  }
}
