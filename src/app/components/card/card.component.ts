import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() displayFormat: string = '';
  @Input() item: any = {};
  img: string = '';
  positiveVotes: string = '';
  negativeVotes : string = '';
  selectVote: string = '';
  voted: boolean = false;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.img = `../../../assets/img/${this.item?.picture}`;
    const total: number = this.item?.votes.positive + this.item?.votes.negative;
    this.positiveVotes = `${Math.round((100 / total) * this.item?.votes.positive)}%`;
    this.negativeVotes = `${Math.round((100 / total) * this.item?.votes.negative)}%`;
  }

  selectVoteOption(option: string): void {
    this.selectVote = this.selectVote === option ? '' : option;
  }

  vote(): void {
    if (this.selectVote) {
      this.voted = true;
      this.cardService.vote(this.item._id, this.selectVote).subscribe((res: any) => {
        this.selectVote = '';
      })
    }
  }

  voteAgain(): void {
    this.voted = false;
    this.selectVote = '';
  }
}
