import { Component } from '@angular/core';
import { Header } from '../../../../models/table.model';

//https://medium.com/@hafeezullah2023/creating-a-dynamic-table-in-angular-with-bootstrap-09dfef86e2d3
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {

  headers: Header[] = [];
  data: T[] = [];
}
