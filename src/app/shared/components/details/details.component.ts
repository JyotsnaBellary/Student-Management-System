import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/core/service/auth/auth.service';
import { isNullOrUndefined } from 'util';
import { IEntity } from '../../entities/Entity.entity';
import { CrudService } from 'src/app/core/service/crud/crud.service';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private authService: AuthService, private crudService: CrudService) { }
  // isUser: string | null = 'student';
  isUser!: string | null;
  // isUser = this.authService.getUser();
  // @Input() details: IEntity | undefined;
   details: IEntity | undefined;

  ngOnInit(): void {

    // this.isUser = this.authService.getUser();
    // if(this.isUser){
    // this.details = this.authService.getDetails(this.isUser);
    // }
    console.log(this.authService.getUserRole());
    this.crudService.getUserDetails().subscribe(res => {
      // this.Books =res;
      // this.crudService.setDetailsListener(res.userDetails);
      this.details = res.userDetails
    });
  }
}
