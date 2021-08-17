import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Todo App';

  constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
