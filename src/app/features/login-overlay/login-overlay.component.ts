import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActiveDirectorySsoService } from "../../core/services/active-directory-sso.service";

@Component({
  selector: "app-login-overlay",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login-overlay.component.html",
  styleUrl: "./login-overlay.component.scss",
})
export class LoginOverlayComponent {
  @Output() loginSuccess = new EventEmitter<string>();

  private readonly ssoService = new ActiveDirectorySsoService();

  readonly users = ["Banking", "Smart city", "Mining", "Utility", "Housing", "Tourisam"];
  readonly features = [
    "Branch & ATM Locator",
    "Service and Accessibility Filters",
    "Network Coverage Analytics",
    "District-Level Demand Planning",
    "Map-Based Reporting",
  ];
  selectedUser = "Banking";
  password = "";
  rememberMe = false;
  passwordVisible = false;
  errorMessage = "";
  ssoMessage = "";

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  continueWithSso(): void {
    const result = this.ssoService.startLogin(this.selectedUser);
    this.errorMessage = "";
    this.ssoMessage = `Signed in with Active Directory SSO as ${result.userName}.`;
    this.loginSuccess.emit(result.userName);
  }

  submit(): void {
    const normalizedUser = this.selectedUser.trim().toLowerCase();
    const allowedUsers = new Set(this.users.map((user) => user.toLowerCase()));

    if (!allowedUsers.has(normalizedUser) || this.password !== "123") {
      this.errorMessage = "Invalid user or password.";
      return;
    }

    this.errorMessage = "";
    this.ssoMessage = "";
    this.loginSuccess.emit(this.selectedUser);
  }
}
