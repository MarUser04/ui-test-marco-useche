import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showOptions = false;
  displayFormat = 'grid';
  allowChangeFormat = true;

  ngOnInit(): void {
    if (window.innerWidth <= 550) {
      this.allowChangeFormat = false;
    } else {
      this.allowChangeFormat = true;
    }
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
