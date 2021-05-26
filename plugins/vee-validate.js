import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required or your custom error message"
});

extend('email', {
    ...email,
    message: 'Email must be valid'
})