import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button.component';
import { LogoutButtonComponent } from './logout-button.component';
import { ProfileComponent } from './profile.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginButtonComponent, LogoutButtonComponent, ProfileComponent],
  styleUrl: 'login.scss',
  template: `
    <div class="app-container">
      <!-- Loading State -->
      @if (auth.isLoading$ | async) {
        <div class="loading-state">
          <div class="loading-text">Loading...</div>
        </div>
      }

      <!-- Error State -->
      @if (auth.error$ | async; as error) {
        <div class="error-state">
          <div class="error-title">Oops!</div>
          <div class="error-message">Something went wrong</div>
          <div class="error-sub-message">{{ error.message }}</div>
        </div>
      }

      <!-- Main Content -->
      @if (!(auth.isLoading$ | async) && !(auth.error$ | async)) {
        <div class="main-card-wrapper">
          <img
            src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
            alt="Auth0 Logo"
            class="auth0-logo"
          />

          @if (auth.isAuthenticated$ | async) {
            <div class="logged-in-section">
                <app-profile />
              <app-logout-button />
            </div>
          } @else {
              <app-login-button />
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class AppComponent {
  protected auth = inject(AuthService);
}
