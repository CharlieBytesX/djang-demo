import { Observable } from "centinel";

class AuthManager {
  isLoggedIn: Observable<boolean>;

  constructor() {
    this.isLoggedIn = new Observable(false);
    this.askServerIfImLoggedIn();
  }

  // Ask the server on init so this will work with http only cookies, jwt...
  public async askServerIfImLoggedIn(): Promise<boolean> {
    const res = await fetch("/api/im_logged_in");
    if (res.ok) {
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
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
    console.log(request.headers);
    let csfrToken = this.getCSFRToken();
    // Initialize headers if not present
    const headers: any = request.headers ? { ...request.headers } : {};
    // Append the CSRF token with correct case
    headers["X-CSRFToken"] = csfrToken;

    // Debugging line to check headers
    console.log("Headers after append:", headers);
    let result = {
      ...request,
      headers: headers,
      mode: "same-origin" as RequestMode,
    };
    console.log(result);
    return result;
  }
}

export const authManager = new AuthManager();
