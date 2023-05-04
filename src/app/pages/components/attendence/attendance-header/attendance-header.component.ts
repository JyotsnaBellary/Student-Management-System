import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IEntity } from '../../../../shared/entities/Entity.entity';
import { CrudService } from 'src/app/core/service/crud/crud.service';

@Component({
  selector: 'app-attendance-header',
  templateUrl: './attendance-header.component.html',
  styleUrls: ['./attendance-header.component.css']
})
export class AttendanceHeaderComponent implements OnInit, OnChanges {

  constructor(private crudService: CrudService) { }
  
  @Input() details: IEntity | undefined;
  @Output() Class = new EventEmitter<string>();
  @Output() Section = new EventEmitter<string>();
  ngOnInit(): void {
    console.log(this.details)
  }
  ngOnChanges(changes: SimpleChanges): void {
console.log(this.details)  }
  onClassClick(){
    this.Class.emit(this.details?.Class);
    this.Section.emit(this.details?.section);
  }
}
