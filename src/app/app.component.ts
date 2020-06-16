import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import {Component, NgModule} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {LinguaService} from './services/lingua.services';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HomePage} from './home/home.page';

@NgModule({
  declarations: [
      HomePage
  ],
  imports: [
      TranslateModule.forChild()
  ],
  exports: [
      HomePage
  ]
})
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'login'
    },
    {
      title: 'Notifiche',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Chat',
      url: '/chat',
      icon: 'chat'
    }
  ];
  constructor(
      private translateService: TranslateService,
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private linguaService: LinguaService,
      private authenticationService: AuthenticationService,
      private router: Router
  ) {
  this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();
    });
  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
   /* const linguaPreferita = this.linguaService.getLinguaPreferita();
    this.translateService.setDefaultLang(linguaPreferita);
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if (lingua != null) {
        this.translateService.use(lingua);
      } else {
        this.translateService.use(linguaPreferita);
        this.linguaService.updateLingua(linguaPreferita);
      }
    });*/
   this.translateService.setDefaultLang('en');
   this.translateService.use('en');
  }
}
