import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

interface SignupCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  rootUrl = "https://api.angular-email.com";
  signedin$ = new BehaviorSubject(null);
  username = "";

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(
      this.rootUrl + "/auth/username",
      {
        username
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<{ username: string }>(
        this.rootUrl + "/auth/signup",
        credentials
        // {
        //   withCredentials: true // by default http client ignores cookies
        // } // now in auth-http-interceptor
      )
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<{ authenticated: boolean; username: string }>(
        this.rootUrl + "/auth/signedin"
        // {
        //   withCredentials: true
        // }
      )
      .pipe(
        tap(({ authenticated, username }) => {
          console.log("authenticated", authenticated);
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(this.rootUrl + "/auth/signin", credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
