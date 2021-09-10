import { Component, OnInit, ViewChild , OnDestroy} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { MovieService } from './services/movie.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  movies: any;
  @ViewChild('errorSwal') private readonly errorSwal!: any;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMoviesList();
    this.searchByTitle();
  }

  getMoviesList() {
    this.movieService.getMoviesList()
      .pipe(untilDestroyed(this))
      .subscribe((response:any) => {
        this.movies = response;
      }, err => {
        this.errorSwal.fire();
      });
  }

  searchByTitle() {
    this.movieService.titleSubject.asObservable()
      .pipe(
        untilDestroyed(this),
        switchMap((response: any) => {
          return this.movieService.searchByTitle(response || '');
      }))
      .subscribe(result => {
        this.movies = result;
      }, err => {
        this.errorSwal.fire();
      });
  }

  ngOnDestroy() {}
}
