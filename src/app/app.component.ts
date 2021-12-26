import { Component, HostListener, OnInit } from '@angular/core'
import { Card } from './interfaces/Card'
import { CardService } from './services/card.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showOptions = false
  displayFormat = 'grid'
  allowChangeFormat = true
  data: Card[] = []

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    if (window.innerWidth <= 520) {
      this.allowChangeFormat = false
      this.displayFormat = 'grid'
    } else {
      this.allowChangeFormat = true
    }

    this.getData()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 520) {
      this.allowChangeFormat = false
      this.displayFormat = 'grid'
    } else {
      this.allowChangeFormat = true
    }
  }

  @HostListener('document:click', ['$event']) clickedOutside() {
    this.showOptions = false
  }

  getData(): void {
    this.cardService.fetchData().subscribe({
      next: (res: any) => (this.data = res),
      error: (err) => console.error(err)
    })
  }

  displayOptions($event: any): void {
    $event.preventDefault()
    $event.stopPropagation()
    this.showOptions = !this.showOptions
  }

  changeFormat(format: string): void {
    this.displayFormat = format
  }
}
