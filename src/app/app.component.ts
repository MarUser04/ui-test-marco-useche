import { Component, HostListener } from '@angular/core'
import { CardService } from './services/card.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showOptions = false
  displayFormat = 'grid'
  allowChangeFormat = true
  data = []

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.allowChangeFormat = false
      this.displayFormat = 'grid'
    } else {
      this.allowChangeFormat = true
    }

    this.getData()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 768) {
      this.allowChangeFormat = false
      this.displayFormat = 'grid'
    } else {
      this.allowChangeFormat = true
    }
  }

  getData(): void {
    this.cardService.fetchData().subscribe({
      next: (res: any) => this.data = res,
      error: err => console.error(err)
    })
  }

  displayOptions(): void {
    this.showOptions = !this.showOptions
  }

  changeFormat(format: string): void {
    this.displayFormat = format
  }
}
