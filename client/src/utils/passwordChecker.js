export class PasswordChecker {
  constructor(password) {
    this.password = password;
  }

  hasCapital() {
    const capitalRegex = /[A-Z]/;
    return capitalRegex.test(this.password);
  }

  hasLowercase() {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(this.password);
  }

  hasNumber() {
    const numberRegex = /[0-9]/;
    return numberRegex.test(this.password);
  }

  isMinLength() {
    return this.password.length >= 8;
  }

  getPasswordColor() {
    const constraints = [
      this.hasCapital(),
      this.hasLowercase(),
      this.hasNumber(),
      this.isMinLength(),
    ];

    const numFulfilledConstraints = constraints.filter(Boolean).length;

    if (this.password === '') {
      return '';
    } else if (numFulfilledConstraints === 4) {
      return '#48bf48';
    } else if (numFulfilledConstraints >= 2) {
      return '#ff8c1a';
    } else if (numFulfilledConstraints === 1) {
      return '#ff0000';
    } else {
      return '#353535';
    }
  }

  getPasswordStrengthBarWidth() {
    const passwordColor = this.getPasswordColor();

    if (passwordColor === '#48bf48') {
      return '100%';
    } else if (passwordColor === '#ff8c1a') {
      return '50%';
    } else if (passwordColor === '#ff0000') {
      return '20%';
    } else {
      return '0';
    }
  }
}