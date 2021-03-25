import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class GeneralDatasource<DatasourceEntity>
  implements DataSource<DatasourceEntity[]> {
  protected dataSubject = new BehaviorSubject<DatasourceEntity[]>([]);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected paginatorSubject = new BehaviorSubject<number>(0);
  protected isErrored = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public isErrored$ = this.isErrored.asObservable();

  // @ts-ignore
  connect(collectionViewer: CollectionViewer): Observable<DatasourceEntity[]> {
    return this.dataSubject.asObservable();
  }

  get length() {
    return this.paginatorSubject.value;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
    this.paginatorSubject.complete();
    this.isErrored.complete();
  }

  loadDataFromService(options: any) {}
}
