import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'om-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public selectedLanguage = 'en';
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}
  public changeLanguage = (code: string): void => {
    this.selectedLanguage = code;
    this.translateService.use(code);
  };
}
