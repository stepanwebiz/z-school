import { object, string } from "yup";

export const personalAccountSchema = [
  object().shape({
    // name: string().required(),
    // lastName: string().required(),
  }),
  object().shape({
    // name: string().required(),
  }),
];

export const logInSchema = object().shape({
  email: string().required(),
  password: string().required(),
});
