import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from '../../../shared/theme/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnDestroy {
  darkMode: boolean = false;
  unsubscribe$ = new Subject();

  constructor(private theme: ThemeService) {
    this.theme.darkMode$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.darkMode = val));
  }

  changeMode(val: any) {
    this.theme.changeMode(val.target.checked);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.unsubscribe();
  }
}
