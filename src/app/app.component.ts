import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // signedin: boolean = false;
  signedin$: BehaviorSubject<boolean>;

  constructor(private authServive: AuthService) {
    this.signedin$ = authServive.signedin$;
  }

  ngOnInit() {
    // this.authServive.signedin$.subscribe(signedin => {
    //   this.signedin = signedin;
    // });
    this.authServive.checkAuth().subscribe(() => {});
  }
}
