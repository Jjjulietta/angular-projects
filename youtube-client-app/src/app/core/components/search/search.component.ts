import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public inputText: string | null = null;
  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  constructor(private router: Router, private YoutubeService: YoutubeService) {}

  ngOnInit() {
    this.searchForm.controls['search'].valueChanges.subscribe(
      (val) => {
        if (debounceTime(600) && val.length > 3 && distinctUntilChanged()) {
          console.log(val);
          this.YoutubeService.submit.next(val);
        }
      }

      //tap((val) => console.log(val) /*this.YoutubeService.submit.next(val)*/)
    );
  }

  /*ngOnChange(text: string) {
    this.inputText = text;
    if (this.inputText !== null) {
      this.YoutubeService.submit.next(this.inputText);
      console.log(this.inputText);
      this.router.navigate(['main']);
    }
  }*/
}
