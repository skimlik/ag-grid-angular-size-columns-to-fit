import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Injectable()
export class ColumnsFactoryService {
  private readonly columns: ColDef[] = [
    {
      colId: 'id',
      field: 'id',
      headerName: 'id',
      width: 80
    }, {
      colId: 'name',
      field: 'name',
      headerName: 'Entity Friendly Name',
      width: 280
    }, {
      colId: 'status',
      field: 'status',
      headerName: 'Entity status',
      width: 120
    }, {
      colId: 'date',
      field: 'date',
      headerName: 'Date created'
    }
  ];

  create(): ColDef[] {
    return this.columns;
  }
}