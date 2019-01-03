import { Component, OnInit } from '@angular/core';
import {SnackBarService} from "../services/snackBarService/snack-bar.service";
import {MatTableDataSource} from "@angular/material";
import {Team} from "../models/Team";
import {TeamService} from "../services/teamService/team.service";

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
  displayedColumns: string[] = ['team_name', 'member_count', 'alc_count', 'edit', 'delete'];
  dataSource: MatTableDataSource<Team>;



  showAllTeams(): void
  {
    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = teams;
        this.dataSource = new MatTableDataSource(teams);
      },
      () => this.snackBar.openSnackBar('Could not load Teams')
    )
  }

  removeSingleTeam(team): void
  {
    this.snackBar.openSnackBar("Deleted");
    this.teamService.deleteSingleTeam(team._id).subscribe(
      response => this.snackBar.openSnackBar('Deleted'),
      () => this.snackBar.openSnackBar('Could not delete Team: '  + team._id)
    );
  }


  ngOnInit() {
    this.teams = [];
    this.showAllTeams();

  }

}
