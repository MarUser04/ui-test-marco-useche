import { Component, HostListener, OnInit } from '@angular/core'
import { Card } from './interfaces/Card'
import { CardService } from './services/card.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showOptions = false // show dropdown options
  displayFormat = 'grid' // results format on view
  allowChangeFormat = true //  allow the option to change the format. Block if it's mobile version
  data: Card[] = [] // data to display

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    // change format on data display when detect mobile size
    if (window.innerWidth <= 520) {
      this.allowChangeFormat = false
      this.displayFormat = 'grid'
    } else {
      this.allowChangeFormat = true
    }

    // Fetch data in first load
    this.getData()
  }

  // change format on data display when detect mobile size
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 520) {
      this.allowChangeFormat = false
      this.displayFormat = 'grid'
    } else {
      this.allowChangeFormat = true
    }
  }

  // Detect click outside of dropdown to close it
  @HostListener('document:click', ['$event']) clickedOutside() {
    this.showOptions = false
  }

  // Fetch data using serviced method
  getData(): void {
    this.cardService.fetchData().subscribe({
      next: (res: any) => (this.data = res),
      error: (err: any) => console.error(err)
    })
  }

  // show dropdown options
  displayOptions($event: any): void {
    $event.preventDefault()
    $event.stopPropagation()
    this.showOptions = !this.showOptions
  }

  // update data display format
  changeFormat(format: string): void {
    this.displayFormat = format
  }
}
