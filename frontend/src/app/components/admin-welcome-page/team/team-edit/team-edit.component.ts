import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/teamService/team.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Team } from 'src/app/models/Team';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  curTeam: Team;
  inputs;

  teamNameFormControl;

  constructor(public router: ActivatedRoute,
              private teamService: TeamService) {
  }

  // returns the teams _id string from the URL, or NULL if none is in there
  getTeamIdFromURL(): string {
    return this.router.snapshot.params.teamId ? this.router.snapshot.params.teamId : null;
  }

  ngOnInit() {
    this.teamNameFormControl = new FormControl('', [
      Validators.required,
    ]);

    this.teamService.init();
    this.teamService.getAllItems().subscribe(
      (teams: Team[]) => {
        const filterResults = teams.filter(team => team._id === this.getTeamIdFromURL());
        this.curTeam = (filterResults.length > 0) ? filterResults[0] : null;
      }
    );

    this.inputs = {
      team_name: '',
      team_alc_count: null
    };
  }

  sendEdit(): void {
    if (this.getTeamIdFromURL()) {

      const editedTeam: Team = {
        _id: this.getTeamIdFromURL(),
        team_name: this.inputs.team_name ? this.inputs.team_name : this.curTeam.team_name,
        team_alc_count: this.inputs.team_alc_count ? this.inputs.team_alc_count : this.curTeam.team_alc_count
      };
      console.log(editedTeam);
      this.teamService.putSingleItem(editedTeam);

    } else {
      // new team -> set alcCount to 0
      const newTeamWithoutId = {
        team_name: this.inputs.team_name,
        team_alc_count: 0,
      };
      this.teamService.postSingleItem(newTeamWithoutId);
    }
  }

}
