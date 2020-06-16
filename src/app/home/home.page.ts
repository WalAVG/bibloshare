import {Component, NgModule, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';
import {PrivateMessageModel} from '../model/privateMessage.model';
import {Observable} from 'rxjs';
import {MessageService} from '../services/message.service';
import {map} from 'rxjs/operators';
import {InsertingModel} from '../model/inserting.model';
import {InsertingService} from '../services/inserting.service';
import {UserModel} from '../model/user.model';
import {UserService} from '../services/user.service';
import {Province} from '../model/province';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
@NgModule({
  imports: [TranslateModule.forChild()]
})
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  hello: string;
  private insertings$: Observable<InsertingModel[]>;
  private messaggi$: Observable<PrivateMessageModel[]>;
  private user$: UserModel;
  private filters: FormGroup;
  private province = new Province();
  private users$: Observable<UserModel[]>;

  constructor(private navController: NavController,
              private translate: TranslateService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private insertingService: InsertingService,
              private userService: UserService,
              private authService: AuthenticationService) {
  }
  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.onIni();
    this.filters = this.formBuilder.group({
      filterProvince: ['', Validators.compose([
        Validators.required
      ])],
      filterGenre: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
  async onIni() {
    this.authService.getToken().then((res) => {
      this.user$ = res;
    });
    this.insertings$ = await this.initializeIntertings();
    this.users$ = await this.initializeUsers();
  }
 // inizializzazione della lista messaggi
 /* async initializeMessage(): Promise<any> {
    const messaggi$ = await this.messageService.listMessages().pipe().toPromise();
    return messaggi$;
  }
  async initializeFilteredMessage(evt): Promise<any> {
    const messaggi$ = await this.messageService.bruh(evt).pipe().toPromise();
    return messaggi$;
  }
  async filterList(evt) {
    this.messaggi$ = await this.initializeMessage();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.messaggi$ = await this.initializeFilteredMessage(searchTerm);
  }*/
  async initializeIntertings(): Promise<any> {
    const insertings$ = await this.insertingService.listInsertings().pipe().toPromise();
    return insertings$;
  }
  async initializeUsers(): Promise<any> {
    const users = await this.userService.userList().pipe().toPromise();
    return users;
  }
  async initializeFilteredInsertings(evt, f1, f2): Promise<any> {
    const inserting$ = await this.insertingService.search(evt, f1, f2).pipe().toPromise();
    return inserting$;
  }
  async filterList(evt) {
    this.insertings$ = await this.initializeIntertings();
    const searchTerm = evt.srcElement.value;
    const filter1 = this.filters.get('filterProvince').value;
    const filter2 = this.filters.get('filterGenre').value;
    if (searchTerm) {
      this.insertings$ = await this.initializeFilteredInsertings(searchTerm, filter1, filter2);
    }    else {
      this.insertings$ = await this.initializeFilteredInsertings('', filter1, filter2);
    }
    // const term1 = this.checkNull(searchTerm);
  }
  async checkNull(value: string) {
    if (!value) {
      return '';
    }
    return value;
  }
  // NAV

  logout() {
    this.authService.logoutUa();
    this.navController.navigateRoot('login');
  }
  navNotifications() {
    this.navController.navigateForward('notifications');
  }
  navLogin() {
    this.navController.navigateForward('login');
  }
  navChat() {
    this.navController.navigateForward('chat/' + 1);
  }
  navProfile() {
    this.navController.navigateForward('profile');
  }
  navNewInserting() {
    this.navController.navigateForward('create-inserting');
  }
  navInserting() {
    this.navController.navigateForward('chat/' + 5);
  }
  navInsertingId(i: number) {
    this.navController.navigateForward('inserting/' + i);
  }
  async getqualcosa() {
    const user = await this.authService.getToken();
  }


}
