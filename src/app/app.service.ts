import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AppService {
  constructor(private jsonp: Jsonp) {}

  search(terms: Observable<string>, debounceMs = 400) {
    return terms
      .debounceTime(debounceMs)
      .distinctUntilChanged()
      .switchMap(term => this.rawsearch(term));
  }

  rawsearch(term: string) {
    const search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');

    return this.jsonp
      .get('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {
        search,
      })
      .map(response => response.json()[1]);
  }
}
