import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/teamService/team.service';
import { BeverageService } from 'src/app/services/beverageService/beverage.service';
import { Team } from 'src/app/models/Team';
import { Beverage } from 'src/app/models/Beverage';

@Component({
  selector: 'app-barkeeper-welcome-page',
  templateUrl: './barkeeper-welcome-page.component.html',
  styleUrls: ['./barkeeper-welcome-page.component.css']
})
export class BarkeeperWelcomePageComponent implements OnInit {
  username: string;

  teamService: TeamService;
  beverageService: BeverageService;
  teams: Team[];
  beverages: Beverage[];

  constructor(teamService: TeamService, beverageService: BeverageService) {
    this.teamService = teamService;
    this.beverageService = beverageService;
  }

  ngOnInit() {
    this.teamService.init();
    this.beverageService.init();
    this.username = sessionStorage.getItem('username');

    this.teamService.getAllItems().subscribe(
      (teamArray: Team[]) => this.teams = teamArray
    );

    this.beverageService.getAllItems().subscribe(
      (bevArray: Beverage[]) => this.beverages = bevArray
    );
  }

  sendDrink(bevId: string, teamId: string) {

    // TODO : refactor updating drinks in order to not need the old team_alc_count. would solve the problem of some lost updates.
    // find out how much alc to add
    const alcToAdd: number = this.beverages.find(bev => bev._id === bevId).beverage_alc;
    // update local team array with new alc score
    // attention: doing this in-place risks losing it when updated before being sent off, BUT...
    // ..helps with lost updates when quickly adding multiple drinks on the same machine
    const indexOfTeam: number = this.teams.findIndex(team => team._id === teamId);
    this.teams[indexOfTeam].team_alc_count += alcToAdd;

    this.teamService.putSingleItem(this.teams[indexOfTeam]);
  }

}
