import { Component, Input, OnInit } from '@angular/core'
import { Card } from 'src/app/interfaces/Card'
import { CardService } from 'src/app/services/card.service'

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() displayFormat: string = ''
  @Input() item!: Card
  img: string = ''
  positiveVotes: string = ''
  negativeVotes: string = ''
  selectVote: string = ''
  voted: boolean = false

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.img = `../../../assets/img/${this.item?.picture}`
    this.calculatePercentage()
  }

  calculatePercentage(): void {
    const total: number = this.item?.votes.positive + this.item?.votes.negative
    if (this.item?.votes.positive) {
      this.positiveVotes = `${Math.round(
        (100 / total) * this.item?.votes.positive
      )}%`
    }
    if (this.item?.votes.negative) {
      this.negativeVotes = `${Math.round(
        (100 / total) * this.item?.votes.negative
      )}%`
    }
  }

  selectVoteOption(option: string): void {
    this.selectVote = this.selectVote === option ? '' : option
  }

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

  voteAgain(): void {
    this.voted = false
    this.selectVote = ''
  }
}
