import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/teamService/team.service';
import { Team } from '../models/Team';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  teamservice: TeamService;
  barChartData: any[];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Scores'];
  public barChartType = 'bar';
  public barChartLegend = false;

  constructor(teamservice: TeamService) {
    this.teamservice = teamservice;
  }

  ngOnInit() {
    this.teamservice.getAllTeams().subscribe(
      (teams: Team[]) => {

        // clear old data
        this.barChartData = [];

        // create temp array
        const tempArr = [];

        teams.forEach( (team: Team) => {
          tempArr.push(
            {
              data: [team.team_alc_count],
              label: team.team_name
            }
          );
        });

        // reassign barChartData to trigger changedetection
        this.barChartData = tempArr;

      }
    );
  }

}
