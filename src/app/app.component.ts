import { Component, HostListener } from '@angular/core';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showOptions = false;
  displayFormat = 'grid';
  allowChangeFormat = true;
  data = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    if (window.innerWidth <= 550) {
      this.allowChangeFormat = false;
    } else {
      this.allowChangeFormat = true;
    }
    
    this.cardService.fetchData().subscribe((res: any) => this.data = res.data)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 550) {
      this.allowChangeFormat = false;
      this.displayFormat = 'grid';
    } else {
      this.allowChangeFormat = true;
    }
  }

  displayOptions() {
    this.showOptions = !this.showOptions;
  }

  changeFormat(format: string) {
    this.displayFormat = format;
  }
}
