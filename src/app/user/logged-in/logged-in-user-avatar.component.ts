import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ApiErrorSnackBar } from '../../api/api-error-snack-bar/api-error-snack-bar.service';
import { AuthApiService } from '../../api/auth/auth-api.service';
import { LoggedInUserService } from '../../auth/logged-in-user.service';
import { UserRole } from '../../auth/user-role';
import { AppRoute } from '../../routing/app-route';
import { InitialsPipe } from '../../shared/pipe/initials.pipe';
import { TextAvatarComponent } from '../../shared/text-avatar/text-avatar.component';

function getUserRoleName(role: string) {
  if (role === UserRole.administrator) {
    return $localize`:@@administrator:`;
  } else if (role === UserRole.teacher) {
    return $localize`:@@teacher:`;
  } else {
    return $localize`:@@student:`;
  }
}

@Component({
  selector: 'app-logged-in-user-avatar',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    InitialsPipe,
    TextAvatarComponent,
  ],
  templateUrl: './logged-in-user-avatar.component.html',
  styleUrls: ['./logged-in-user-avatar.component.scss'],
})
export class LoggedInUserAvatarComponent implements OnInit {
  protected userFullName!: string;
  protected userRole!: string;
  protected userImage?: string;

  constructor(
    private readonly router: Router,
    private readonly authApi: AuthApiService,
    private readonly loggedInUser: LoggedInUserService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnInit() {
    this.userFullName = this.loggedInUser.userFullName;
    this.userRole = getUserRoleName(this.loggedInUser.highestRole);
    this.userImage = this.loggedInUser.userImage;
  }

  protected logOut() {
    this.authApi.logOut().subscribe((response) => {
      if (response.isSuccess()) {
        this.loggedInUser.logOut();
        this.router.navigateByUrl(AppRoute.login.routerLink, {
          replaceUrl: true,
        });
      } else {
        this.snackBar.open(response.error!);
      }
    });
  }
}
