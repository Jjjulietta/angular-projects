import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchItem } from 'src/app/youtube/models/search-item.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export class DetailedInfoPageComponent {
  route = inject(ActivatedRoute);
  youtubeServices = inject(YoutubeService);
  card: SearchItem | undefined;
  date?: string;

  constructor(private router: Router, private location: Location) {
    const cardId = this.route.snapshot.params['id'];
    console.log(cardId);
    this.card = this.youtubeServices.getResultById(cardId);
    console.log(this.card);
    if (this.card)
      // this.date = new Date(this.card?.snippet.publishedAt).getDate();
      // console.log(this.date);
      this.date = this.youtubeServices.getDateById(cardId);
    console.log(this.date);
  }

  back() {
    this.location.back();
    //this.router.navigate(['']);
  }
}
