import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../formik-fields/InputField";

const validationSchema = Yup.object({
  label: Yup.string().required("This field is required"),
  value: Yup.string().required("This field is required"),
}).required();

type FormValues = Yup.InferType<typeof validationSchema>;

interface SecretFormProps {
  onSubmit?: (values: FormValues) => void;
}

const SecretForm = React.forwardRef<HTMLButtonElement, SecretFormProps>(
  ({ onSubmit }, ref) => {
    return (
      <Formik
        initialValues={{
          label: "",
          value: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          if (onSubmit) {
            await onSubmit(values);
            actions.setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <InputField
                name="value"
                label="Value"
                placeholder="The value of the secret to store"
              />
              <InputField
                name="label"
                label="Label"
                placeholder="A label for the secret"
              />
            </div>
            <button type="submit" ref={ref} />
          </form>
        )}
      </Formik>
    );
  }
);

export default SecretForm;
