import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/core/service/library/library.service';
import { Book } from '../../entities/Library.entity';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(private libraryService:LibraryService) { }

  ngOnInit(): void {
  }

}
