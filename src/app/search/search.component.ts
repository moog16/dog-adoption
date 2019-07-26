import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onKey(event: KeyboardEvent) {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  onSubmit(event) {
    event.preventDefault();
    this.router.navigate(['/grid-results', this.searchValue]);
  }

}
