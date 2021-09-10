import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MovieService } from '../services/movie.service';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTitleForm!: FormGroup;
  constructor(private movieService: MovieService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
   this.searchTitleForm = this.fb.group({
      searchByTitle: new FormControl(''),
    });
    this.searchTitleForm.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500),
      ).subscribe((changes: any) => {
        if (changes && changes.searchByTitle) {
          this.movieService.titleSubject.next(changes.searchByTitle);
        } else {
          this.movieService.titleSubject.next('');
        }
      });
  }

  ngOnDestroy(): void {
  }
}
