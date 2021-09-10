import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() movies: any;
  settings = {
    hideSubheader: true,
    actions: false,
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      ID: {
        title: 'ID',
        filter: false,
        editable: false
      },
      Title: {
        title: 'Title',
        filter: false,
        editable: false
      },
      Year: {
        title: 'Year',
        filter: false,
        editable: false
      },
      Rating: {
        title: 'Rating',
        filter: false,
        editable: false
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
