import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import PageLayout from "../components/layout/PageLayout";
import Card from "../components/layout/Card";
import Header from "../components/layout/Header";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import Alert from "../components/ui/Alert";

function AddEmployee() {
  // 🔹 Define form fields
  const FORM_FIELDS = {
    NAME: "name",
    EMAIL: "email",
    SALARY: "salary",
    DESIGNATION: "designation",
    ACCOUNT_NUMBER: "accountNumber",
  };

  // 🔹 Local state for form and status
  const [values, setValues] = useState({
    name: "",
    email: "",
    salary: "",
    designation: "",
    accountNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("");

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {};
  const getFieldError = () => null;

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // 🔹 Submit handler to call backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/employees`,
        {
          name: values.name,
          email: values.email,
          salary: parseFloat(values.salary),
          designation: values.designation,
          accountNumber: values.accountNumber,
        }
      );

      if (response.status === 201) {
        setSuccess("✅ Employee added successfully!");
        setAlertType("success");
        // reset form
        setValues({
          name: "",
          email: "",
          salary: "",
          designation: "",
          accountNumber: "",
        });
      }
    } catch (err) {
      console.error("API Error:", err);

      // show backend validation message if exists
      const backendMessage =
        err.response?.data?.message || "❌ Failed to create employee.";
      setError(backendMessage);
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <Card className="w-2/6">
        <Header
          logo={logo}
          title="Slipify"
          subtitle="Welcome to"
          description="Creating Employee"
          additionalDescription="Uploading employee information"
        />

        <Form onSubmit={handleSubmit} className="mt-6">
          {/* 🔹 Alerts for success or error */}
          {(error || success) && (
            <Alert
              type={alertType}
              message={error || success}
              onClose={clearMessages}
            />
          )}

          {/* 🔹 Name Field */}
          <FormField
            id={FORM_FIELDS.NAME}
            name={FORM_FIELDS.NAME}
            type="text"
            value={values[FORM_FIELDS.NAME]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Sania Arooj"
            label="Name"
            required
            error={getFieldError(FORM_FIELDS.NAME)}
          />

          {/* 🔹 Email Field */}
          <FormField
            id={FORM_FIELDS.EMAIL}
            name={FORM_FIELDS.EMAIL}
            type="email"
            value={values[FORM_FIELDS.EMAIL]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="example@gmail.com"
            label="Email"
            required
            error={getFieldError(FORM_FIELDS.EMAIL)}
          />

          {/* 🔹 Salary + Designation + Account Number */}
          <div className="flex flex-col gap-6">
            <FormField
              id={FORM_FIELDS.SALARY}
              name={FORM_FIELDS.SALARY}
              type="number"
              value={values[FORM_FIELDS.SALARY]}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Salary"
              required
              error={getFieldError(FORM_FIELDS.SALARY)}
            />

            <FormField
              id={FORM_FIELDS.DESIGNATION}
              name={FORM_FIELDS.DESIGNATION}
              type="text"
              value={values[FORM_FIELDS.DESIGNATION]}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Designation"
              required
              error={getFieldError(FORM_FIELDS.DESIGNATION)}
            />

            <FormField
              id={FORM_FIELDS.ACCOUNT_NUMBER}
              name={FORM_FIELDS.ACCOUNT_NUMBER}
              type="text"
              value={values[FORM_FIELDS.ACCOUNT_NUMBER]}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Account Number"
              required
              error={getFieldError(FORM_FIELDS.ACCOUNT_NUMBER)}
            />
          </div>

          {/* 🔹 Submit Button */}
          <Button
            label={isLoading ? "Creating Employee..." : "Create Employee"}
            onClick={handleSubmit}
            type="secondary"
            disabled={isLoading}
          />
        </Form>
      </Card>
    </PageLayout>
  );
}

export default AddEmployee;
