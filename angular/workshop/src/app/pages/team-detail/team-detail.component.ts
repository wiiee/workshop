import { TeamService } from './../../services/team.service';
import { Team } from './../../entity/team';
import { Component, OnInit } from '@angular/core';
import { Constant } from '../../entity/constant';
import { Location } from '@angular/common';
import { EnumService } from './../../services/enum.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  oriTeam: Team;

  ownerPairs: any;
  userPairs: any;

  //是否是新建
  isNew: boolean;
  isEdit: boolean;

  errorMsg: string;
  successMsg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private teamService: TeamService,
    private userService: UserService) {
    this.team = new Team();
    this.isNew = true;
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
    this.route.queryParamMap.subscribe(params => {
      this.successMsg = params.get("successMsg");
      const id = this.route.snapshot.paramMap.get('id');

      if (id !== Constant.INVALID_ID) {
        this.isNew = false;
        this.teamService.getOne(id).subscribe(res => {
          console.log(res);
          this.team = res.data;
          this.oriTeam = Object.assign({}, this.team);
        });
      }
    });
  }

  onSubmit() {
    this.errorMsg = null;
    console.log("Thanks for submitting! Data: " + JSON.stringify(this.team));

    if (this.isNew) {
      this.teamService.add(this.team).subscribe(res => {
        if (!res.isSuccessful) {
          this.errorMsg = res.errorMsg;
        }
        else {
          this.refresh("Create team " + this.team.id + " successfully!");
        }
      });
    }
    else {
      this.teamService.update(this.team).subscribe(res => {
        if (!res.isSuccessful) {
          this.errorMsg = res.errorMsg;
        }
        else {
          this.successMsg = "Update team " + this.team.id + " successfully!";
        }
      });
    }
  }

  refresh(successMsg: string): void {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'successMsg': successMsg }
    };

    // Navigate to the user detail page with extras
    this.router.navigate(['/team', this.team.id], navigationExtras);
  }

  resetForm(): void {
    this.team = Object.assign({}, this.oriTeam);
    console.log(JSON.stringify(this.team));
  }

  goBack(): void {
    this.location.back();
  }
}
