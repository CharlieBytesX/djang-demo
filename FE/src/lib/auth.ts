import { Observable } from "centinel";

class AuthManager {
  isLoggedIn: Observable<boolean>;

  constructor() {
    this.isLoggedIn = new Observable(false);
    this.askServerIfImLoggedIn();
  }

  // Ask the server on init so this will work with http only cookies, jwt...
  private async askServerIfImLoggedIn() {
    const res = await fetch("/api/im_logged_in");
    if (res.ok) {
      this.isLoggedIn.set(true);
    }
  }
  private getCSFRToken() {
    const cookies = document.cookie.split(";");
    let csrfToken = "";
    for (let index = 0; index < cookies.length; index++) {
      const cookie = cookies[index];
      if (cookie.startsWith("csrftoken=")) {
        csrfToken = cookie.split("=")[1];
      }
    }
    return csrfToken;
  }
  public logout() {
    this.isLoggedIn.set(false);
  }
  public login() {
    this.isLoggedIn.set(true);
  }

  public addAuthToRequest(request: RequestInit): RequestInit {
    let csfrToken = this.getCSFRToken();
    let oldHeaders = new Headers(request.headers);
    oldHeaders.append("X-CSRFToken", csfrToken);
    let result = {
      ...request,
      headers: oldHeaders,
      mode: "same-origin" as RequestMode,
    };
    return result;
  }
}

export const authManager = new AuthManager();
