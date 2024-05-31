import { Observable } from "centinel";

class AuthManager {
  private authCSFRToken: string;
  isLoggedIn: Observable<boolean>;

  constructor() {
    this.authCSFRToken = this.getCSFRToken();
    this.isLoggedIn = new Observable(false);
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

  public addAuthToRequest(request: RequestInit): RequestInit {
    let oldHeaders = new Headers(request.headers)
    oldHeaders.append("X-CSRFToken", this.authCSFRToken);
    let result = {
      ...request,
      headers: oldHeaders,
      mode: "same-origin" as RequestMode,
    };

    return result;
  }
}

export const authManager = new AuthManager();