import { Component } from '@angular/core';
import { AppService } from './app.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items: Array<string>;

  constructor(private service: AppService) {}

  search(term: string) {
    this.service.search(term).subscribe(results => (this.items = results));
  }
}
