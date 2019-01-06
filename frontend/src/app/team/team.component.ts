import { Component, OnInit } from '@angular/core';
import {SnackBarService} from '../services/snackBarService/snack-bar.service';
import {MatTableDataSource} from '@angular/material';
import {Team} from '../models/Team';
import {TeamService} from '../services/teamService/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {


  constructor(private teamService: TeamService,
              private snackBar: SnackBarService
  ) { }

  private teams: Team[];
  displayedColumns: string[] = ['team_name', 'alc_count', 'edit', 'delete'];
  dataSource: MatTableDataSource<Team>;



  showAllTeams(): void {
    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = teams;
        this.dataSource = new MatTableDataSource(teams);
      },
      (error) => {
        console.log('getallteams-subscription gave error!');
        console.log(error);
        return this.snackBar.openSnackBar('Could not load Teams');
      }
  );
  }

  removeSingleTeam(team): void {
    this.snackBar.openSnackBar('Deleted');
    this.teamService.deleteSingleTeam(team._id).subscribe(
      response => this.snackBar.openSnackBar('Deleted'),
      () => this.snackBar.openSnackBar('Could not delete Team: '  + team._id)
    );
  }


  updateViaSocket(): void {
    console.log('Update triggered manually');
    this.teamService.keepUpdatedViaSocket();
  }
  ngOnInit() {
    this.teams = [];
    this.showAllTeams();
    this.teamService.keepUpdatedViaSocket();
  }

}
