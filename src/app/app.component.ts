import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { ThemeService } from './shared/theme/theme.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private theme: ThemeService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/todo']);

    if (isPlatformBrowser(this.platformId)) {
      this.theme.changeMode(
        JSON.parse(
          localStorage.getItem('theme') ||
            `${
              window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches
            }`
        )
      );
    }
  }
}
