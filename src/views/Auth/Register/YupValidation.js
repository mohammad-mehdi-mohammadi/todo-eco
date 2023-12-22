import * as yup from "yup";
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const YupValidation = yup.object().shape({
  username: yup
    .string()
    .required("Enter Your Username"),

  password: yup
    .string()
    .required("Enter Your Password")
    .matches(PasswordRegEx, "Uppercase Lowercase Special char Required")
    .min(8, "Password Should be minimum 8 character"),


  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not matched")
    .required("Confirm Password is Required"),

});
export default YupValidation
