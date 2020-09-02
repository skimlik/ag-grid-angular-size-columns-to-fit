import { Injectable } from '@angular/core';
import { IEntity } from './entity';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { createTokenForReference } from '@angular/compiler/src/identifiers';

@Injectable()
export class DataService {
  private data: {[snapshotId: number]: IEntity[] };

  constructor() {
    this.data[0] = [
      { id: 1, name: 'This is my entity name', status: 'Active', date: new Date()},
      { id: 2, name: 'Just another entity', status: 'Pending', date: new Date()}
    ];
    this.data[1] = [
        { id: 1, name: 'Item 1', status: 'Active', date: new Date()},
        { id: 2, name: 'Item 2', status: 'Pending', date: new Date()},
        { id: 3, name: 'Item 3', status: 'Active', date: new Date()},
        { id: 4, name: 'Item 4', status: 'Active', date: new Date()},
        { id: 5, name: 'Item 5', status: 'Disabled', date: new Date()},
        { id: 6, name: 'Item 6', status: 'Active', date: new Date()},
        { id: 7, name: 'Item 7', status: 'Active', date: new Date()},
      ];
  }

  public get(dataSnapshotId: number): Observable<IEntity[]> {
    const data = this.data[dataSnapshotId];
    if (!this.data) {
      return this.toObservable([]);
    }
    return this.toObservable(data);
  }

  private toObservable(data: IEntity[]): Observable<IEntity[]> {
    return of(data).pipe(
      // simulate network latency
      delay(300)
    );
  }
}