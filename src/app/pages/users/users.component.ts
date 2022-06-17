import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorMessageService } from '../../services/error-message/error-message.service';
import { UserModel } from '../../services/users/models/user.model';
import { UsersService } from '../../services/users/users.service';

export interface ListColumnModel {
  name?: string;
  property?: string;
  visible?: boolean;
  width?: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private readonly CONFIG: MatSnackBarConfig = { duration: 5000, panelClass: ['snackbar-success'], horizontalPosition: 'right' };
  private readonly ACTION = 'OK';

  dataSource: MatTableDataSource<any> | null;
  columns: ListColumnModel[] = [];
  columnsKeys: string[] = [];
  columnsHeaders: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly userService: UsersService,
    private readonly errorMessage: ErrorMessageService,
    private readonly snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.columns = [
      { name: 'ID', property: 'id', visible: true, width: '30px' },
      { name: 'First Name', property: 'first_name', visible: true },
      { name: 'Last Name', property: 'last_name', visible: true },
      { name: 'Role', property: 'role', visible: true },
      { name: 'Age', property: 'age', visible: true, width: '30px' },
      { name: 'City', property: 'city', visible: true }
    ] as ListColumnModel[];

    this.columnsKeys = this.columns.map(item => item.property);
    this.columnsKeys.push('csv');
    this.columnsHeaders = this.columns.map(item => item.name);

    this.load()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  load(): void {
    this.dataSource = new MatTableDataSource();
    this.userService.getUsers().subscribe(
      data => this.dataSource.data = data,
      error => this.errorMessage.show(error)
    );
  }

  downloadAsCSV(row: UserModel): void {
    const values: string[] = [];
    const keys: string[] = Object.keys(row);
    keys.forEach(key => values.push(row[key]));

    const dataStr = this.columnsHeaders.join(',') + '\n' + values.join(',');

    const newBlob = new Blob([dataStr], { type: 'text/csv' });
    const fileName: string = `${row.first_name} ${row.last_name}.csv`;

    const data = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = data;

    link.download = fileName;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);

    this.snackbar.open(`${fileName} downloaded successfully`, this.ACTION, this.CONFIG);
  }
}
