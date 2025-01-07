import { z, ZodType } from "zod";
import { UseFormRegister, FieldError } from "react-hook-form";

// Define the type for form data
export type FormData = {
  email: string;
  githubUrl: string;
  yearsOfExperience: number;
  password: string;
  confirmPassword: string;
};

// Define props for form fields
export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

// Define valid field names for the form
export type ValidFieldNames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword";

// Define the Zod schema for form validation
export const UserSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    githubUrl: z
      .string()
      .url({ message: "Invalid URL" })
      .refine((url) => url.includes("github.com"), {
        message: "Invalid GitHub URL",
      }),
    yearsOfExperience: z
      .number({
        required_error: "required field",
        invalid_type_error: "Years of Experience is required",
      })
      .min(1, { message: "Minimum 1 year of experience is required" })
      .max(10, { message: "Maximum 10 years of experience allowed" }),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path of error
  });
