import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public inputText: string = '';
  YoutubeService: any;
  router: any;
  // @Output() submit = new EventEmitter();

  ngOnChange(text: string) {
    this.inputText = text;
    this.inputText = text;
    this.YoutubeService.submit.next(this.inputText);
    console.log(this.inputText);
    this.router.navigate(['main']);
  }
}
