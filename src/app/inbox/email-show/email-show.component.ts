import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { EmailService } from "../email.service";
import { Email } from "../email";

@Component({
  selector: "app-email-show",
  templateUrl: "./email-show.component.html",
  styleUrls: ["./email-show.component.css"]
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(
    private route: ActivatedRoute
  ) // private emailService: EmailService
  {
    this.email = this.route.snapshot.data.email;
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit() {
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe(email => {
    //     console.log(email);
    //   });
    // });
    // console.log(this.route.snapshot.params.id); // does not work as needed
    // this.route.params
    //   .pipe(
    //     // to cancel requests
    //     switchMap(({ id }) => {
    //       return this.emailService.getEmail(id);
    //     })
    //   )
    //   .subscribe(email => {
    //     this.email = email;
    //   });
  }
}
