import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { IEntity } from '../../entities/Entity.entity';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isUser!: string | null;
  // @Input() details: IEntity | undefined;
   details: IEntity | undefined;

  ngOnInit(): void {
    this.isUser = this.authService.getUser();
    if(this.isUser){
    this.details = this.authService.getDetails(this.isUser)
    }
  }
}
