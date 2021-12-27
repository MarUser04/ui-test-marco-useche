import { Component, HostListener, Input, OnInit } from '@angular/core'
import { Card } from 'src/app/interfaces/Card'
import { CardService } from 'src/app/services/card.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() displayFormat: string = '' // results format on view
  @Input() item!: Card // data for the controversial celebrity
  img: string = '' // image url
  positiveVotes: string = '' // positive votes percentage
  negativeVotes: string = '' // negative votes percentage
  selectVote: string = '' // current vote selected
  voted: boolean = false // vote status to change card display
  lastUpdated: string = '' // last updated date
  sliceName: boolean = false // variable to format name length if mobile size format

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    if (this.item?.picture) {
      this.img = `../../../assets/img/${this.item?.picture}`
    }

    this.calculatePercentage()

    // Calculate last update value, using the item date and the current date
    if (this.item.lastUpdated) {
      const oneDay = 1000 * 60 * 60 * 24
      const diffDates = new Date().getTime() - new Date(this.item.lastUpdated).getTime()
      const totalDays = Math.round(diffDates / oneDay)
      this.lastUpdated = this.calculateLastUpdated(totalDays)
    }
  }

  // Detect mobile size to add slice in names with long length
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth <= 1000) {
      this.sliceName = true
    } else {
      this.sliceName = false
    }
  }

  // Return last update label
  calculateLastUpdated(totalDays: number): string {
    if (totalDays > 356) {
      return `${Math.round(totalDays / 365)} year(s) ago`
    } else if (totalDays > 31) {
      return `${Math.round(totalDays / 31)} month(s) ago`
    }
    return `${totalDays} day(s) ago`
  }

  // Calculate percentage of positive and negative votes
  calculatePercentage(): void {
    const positive: number = this.item?.votes.positive || 0
    const negative: number = this.item?.votes.negative || 0
    const total: number = positive + negative

    if (positive) {
      this.positiveVotes = `${Math.round((100 / total) * positive)}%`
    }
    if (negative) {
      this.negativeVotes = `${Math.round((100 / total) * negative)}%`
    }
  }

  // Update current vote selection
  selectVoteOption(option: string): void {
    this.selectVote = this.selectVote === option ? '' : option
  }

  // Send vote and update current item, recalculating the percentage
  vote(): void {
    if (this.selectVote) {
      this.voted = true
      this.cardService.vote(this.item._id, this.selectVote).subscribe({
        next: (res: any) => {
          this.selectVote = ''
          this.item = res.data
          this.calculatePercentage()
        },
        error: (err) => console.error(err)
      })
    }
  }

  // Reset values to vote again
  voteAgain(): void {
    this.voted = false
    this.selectVote = ''
  }
}
