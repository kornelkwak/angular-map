import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TitleComponent, MaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent { 
  constructor(private router: Router) {}

  goToMap() {
    this.router.navigate(['/map']);
  }
}
