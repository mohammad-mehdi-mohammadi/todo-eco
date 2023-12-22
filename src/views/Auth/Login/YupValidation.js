import * as yup from "yup";

const YupValidation = yup.object().shape({
    username: yup
        .string()
        .required("Enter Your Username"),

    password: yup
        .string()
        .required("Enter Your Password")
        .min(8, "Password Should be minimum 8 character"),


});
export default YupValidation
