import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from './../../services/team.service';
import { Team } from './../../entity/team';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: any = {};
  ownerPairs: any;
  userPairs: any;
  
  constructor(
    private teamService: TeamService, 
    private userService: UserService,
    private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.userService.getOwnerPairs().subscribe(res => {
      this.ownerPairs = res;
    });
    this.userService.getUserPairs().subscribe(res => {
      this.userPairs = res;
    });
    this.getTeam();
  }

  getTeam(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.teamService.getTeam(id)
      .subscribe(res => {
        this.team = res.data;
      });
  }
}
