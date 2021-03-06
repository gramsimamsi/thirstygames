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

  displayedColumns: string[] = ['team_name', 'alc_count', 'delete', 'edit'];
  dataSource: MatTableDataSource<Team>;

  constructor(  public teamService: TeamService,
                private snackBar: SnackBarService) { }

  showAllTeams(): void {
    this.teamService.getAllItems().subscribe(
      teams => {
        this.dataSource = new MatTableDataSource(teams);
      },
      (error) => {
        return this.snackBar.openSnackBar('Could not load Teams');
      }
  );
  }

  removeSingleTeam(team): void {
    this.teamService.deleteSingleItem(team._id);
  }

  ngOnInit() {
    this.teamService.init();
    this.showAllTeams();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
