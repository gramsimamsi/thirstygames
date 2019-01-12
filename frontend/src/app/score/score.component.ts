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
  public barChartLabels: string[] = ['Scores'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              suggestedMax: 10
          }
      }]
  },
    responsive: true
  };

  constructor(teamservice: TeamService) {
    this.teamservice = teamservice;
  }

  ngOnInit() {
    this.teamservice.init();
    this.teamservice.getAllItems().subscribe(
      (teams: Team[]) => {

        // clear old data
        this.barChartData = [];

        teams.forEach( (team: Team) => {
          this.barChartData.push(
            {
              data: [team.team_alc_count],
              label: team.team_name
            }
          );

          // tell the autoscaling y axis to increase its upper display limit if necessary
          if ((team.team_alc_count + 5) > this.barChartOptions.scales.yAxes[0].ticks.suggestedMax) {
            this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = team.team_alc_count + 5;
          }
        });

      }
    );
  }
}
