import { boolean, mixed, number, object, string } from 'yup';

const validPictureExtensions = ['png', 'jpeg'];
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

function isValidFileType(fileType: string): boolean {
  return validPictureExtensions.includes(fileType);
}

export const formSchema = object({
  name: string()
    .trim()
    .required()
    .test((value) => {
      const firstLetter = value.substring(0, 1);

      return firstLetter == firstLetter.toUpperCase();
    }),
  age: number().integer().min(0).required(),
  email: string().email().required(),
  password1: string()
    .test(
      'Strength requirements',
      'Password should contains at least 1 number, 1 uppercased letter, 1 lowercased letter and one special character',
      (value) => {
        const actualValue = value || '';
        let containsLowercase = false;
        let containsUppercase = false;
        let containsSpecial = false;
        let containsNumber = false;
        for (let i = 0; i < actualValue.length; i++) {
          const char = actualValue.charAt(i);
          containsLowercase ||= char.toLowerCase() === char;
          containsUppercase ||= char.toUpperCase() === char;
          containsSpecial ||= /[^\w\d]/.test(char);
          containsNumber ||= /\d/.test(char);
        }
        return (
          containsLowercase &&
          containsUppercase &&
          containsSpecial &&
          containsNumber
        );
      }
    )
    .required(),
  password2: string()
    .test(
      'Password repetition requirements',
      'Passwords should be the same',
      (value, values) => {
        return values.parent['password1'] == value;
      }
    )
    .required(),
  gender: string().required(),
  acceptTerms: boolean().default(false).required(),
  image: mixed<FileList>()
    .required()
    .test(
      'Extension requirement',
      'File format must be either PNG or JPEG',
      (value) => {
        const file = value[0];
        return (
          file &&
          file.name != null &&
          isValidFileType(file.name.substring(file.name.lastIndexOf('.') + 1))
        );
      }
    )
    .test('Size requirement', 'File size should be less than 5MB', (value) => {
      const file = value[0];
      return file && file.size <= MAX_FILE_SIZE;
    }),
  country: string().required(),
});
