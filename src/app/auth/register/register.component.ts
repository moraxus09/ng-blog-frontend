import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {paths} from '../../config/globals';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  currentStep = 0;
  profilePlaceholderSrc = paths.profilePlaceholder;
  selectedImageSrc: any;
  selectedImage: File;
  fileReader = new FileReader();

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  onNextStep() {
    if (this.registerForm.valid) {
      this.currentStep = 1;
    }
  }

  onImageChange(event: Event) {
    this.selectedImage = (event.target as HTMLInputElement).files[0];
    this.fileReader.onload = () => {
      this.selectedImageSrc = this.fileReader.result;
    };
    this.fileReader.readAsDataURL(this.selectedImage);
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.selectedImage ? {...this.registerForm.value, avatar: this.selectedImage} : this.registerForm.value;
      delete formData.confirmPassword;
      this.auth.register(formData).subscribe(() => this.router.navigate(['dashboard']));
    }
  }

  initForm() {
    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.passwordsMatchValidator.bind(this)
    });
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordsMatch: false };
    }
  }

}
