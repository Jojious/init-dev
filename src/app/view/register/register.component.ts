import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { SalepageService } from '@app/services/nosql/salepage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, Status } from '@app/models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  hide = true;
  rehide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: SalepageService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      tel: ['', Validators.required],
      line: ['', Validators.required],
      email: ['', Validators.required],
      recomment: ['', Validators.required]
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const member = {
      username: this.f.username.value,
      password: this.f.password.value,
      tel: this.f.tel.value,
      line: this.f.line.value,
      email: this.f.email.value,
      recomment: this.f.recomment.value,
      role: Role.User,
      status: Status.Inactive
    };

    this.loading = true;
    this.authenticationService
      .createMember(member)
      .then(() => {
        alert('Resgister successfully');
        this.router.navigate(['/']);
      })
      .catch(err => alert(err));
  }
}
