import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/usersService/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  curUser: User;
  inputs;

  constructor(public router: ActivatedRoute,
              public userService: UsersService) {
  }

  // returns the users _id string from the URL
  getUserIdFromURL(): string {
    return this.router.snapshot.params.userId;
  }

  ngOnInit() {

    this.userService.init();
    this.userService.getAllItems().subscribe(
      (teams: User[]) => {
        const filterResults = teams.filter(team => team._id === this.getUserIdFromURL());
        this.curUser = (filterResults.length > 0) ? filterResults[0] : null;
      }
    );

    this.inputs = {
      user_role: null
    };
  }

  sendEdit(): void {

    const editedUser: User = {
      _id: this.getUserIdFromURL(),
      user_name: this.curUser.user_name,
      user_role: +this.inputs.user_role
    };

    this.userService.putSingleItem(editedUser);
  }

}
