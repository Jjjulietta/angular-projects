import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public inputText: string | null = null;
  constructor(private router: Router, private YoutubeService: YoutubeService) {}

  search(text: string) {
    this.inputText = text;
    if (this.inputText !== null) {
      this.YoutubeService.submit.next(this.inputText);
      console.log(this.inputText);
      this.router.navigate(['main']);
    }
  }
}
