import * as yup from "yup";

const YupValidation = yup.object().shape({
    title: yup
        .string()
        .required("Enter Your Title"),

});
export default YupValidation
