import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filteredSearch:string = '';
  @Output() filteredSearchEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  search(){
    this.filteredSearchEmitter.emit(this.filteredSearch);
  }

}
