import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Define the custom validator logic
@ValidatorConstraint({ async: false })
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string): boolean {
    const regex = /^(?=.*\d).{8,}$/; // At least 8 characters and contains at least one digit
    return regex.test(password);
  }

  defaultMessage(): string {
    return 'Password must be at least 8 characters long and contain at least one number.';
  }
}

// Create the decorator
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}
