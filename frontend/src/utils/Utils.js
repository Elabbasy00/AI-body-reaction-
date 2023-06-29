import { toast } from "react-toastify";

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const toastOnError = (error) => {
  if (error.response) {
    if (error.response.data.non_field_errors) {
      toast.error(JSON.stringify("email or password invalid"));
    } else if (error.response.data.password) {
      toast.error(JSON.stringify("password invalid"));
    } else if (error.response.data.email) {
      toast.error(JSON.stringify("invalid email"));
    } else if (error.response.data.username) {
      toast.error(JSON.stringify("invalid username"));
    }
    // known error
    // toast.error(JSON.stringify(error.response.data));
  } else if (error.message) {
    toast.error(JSON.stringify(error.message));
  } else {
    toast.error(JSON.stringify(error));
  }
};
