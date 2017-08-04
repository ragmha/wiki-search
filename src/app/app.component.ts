import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items: Array<string>;
  term$ = new Subject<string>();

  constructor(private service: AppService) {}

  ngOnInit() {
    this.term$.debounceTime(400).subscribe(term => this.search(term));
  }

  search(term: string) {
    this.service.search(term).subscribe(results => (this.items = results));
  }
}
