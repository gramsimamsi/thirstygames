import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Team } from 'src/app/models/Team';
import { TeamService } from 'src/app/services/teamService/team.service';
import { SnackBarService } from 'src/app/services/snackBarService/snack-bar.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['team_name', 'alc_count', 'delete', 'dummyUpdate', 'edit'];
  dataSource: MatTableDataSource<Team>;

  constructor(private teamService: TeamService,
              private snackBar: SnackBarService) { }

  showAllTeams(): void {
    this.teamService.getAllItems().subscribe(
      teams => {
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
    this.teamService.deleteSingleItem(team._id);
  }

  updateSingleTeam(team): void {
    team.team_alc_count = Math.floor(Math.random() * 100);
    this.teamService.putSingleItem(team);
  }
  ngOnInit() {
    this.teamService.init();
    this.showAllTeams();
  }

  createSingleTeam() {
    const team = {
      team_name: 'testTeam',
      team_alc_count: 0};
    this.teamService.postSingleItem(team);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
