import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEntity } from '../../entities/Entity.entity';

@Component({
  selector: 'app-attendance-header',
  templateUrl: './attendance-header.component.html',
  styleUrls: ['./attendance-header.component.css']
})
export class AttendanceHeaderComponent implements OnInit {

  constructor() { }
  @Input() details: IEntity | undefined;
  @Output() Class = new EventEmitter<string>();
  @Output() Section = new EventEmitter<string>();
  ngOnInit(): void {
    console.log(this.details?.teacherDetails?.class)
  }
  onClassClick(){
    this.Class.emit(this.details?.teacherDetails?.class);
    this.Section.emit(this.details?.teacherDetails?.section);
  }
}
