import logo from "../assets/logo.png";
import Button from "../components/Button";
import PageLayout from "../components/layout/PageLayout";
import Card from "../components/layout/Card";
import Header from "../components/layout/Header";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import Alert from "../components/ui/Alert";
import useUserForm from "../hooks/useUserForm";
import { FORM_FIELDS } from "../domain/types";

function AddEmployee() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoading,
    error,
    success,
    alertType,
    getFieldError,
    clearMessages,
  } = useUserForm({
    [FORM_FIELDS.NAME]: "",
    [FORM_FIELDS.EMAIL]: "",
    [FORM_FIELDS.SALARY]: "",
    [FORM_FIELDS.DESIGNATION]: "",
    [FORM_FIELDS.ACCOUNT_NUMBER]: "",
  });
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
          {/* Error and Success Messages */}
          {(error || success) && (
            <Alert
              type={alertType}
              message={error || success}
              onClose={clearMessages}
            />
          )}

          {/* Name */}
          <FormField
            id={FORM_FIELDS.NAME}
            name={FORM_FIELDS.NAME}
            type="name"
            value={values[FORM_FIELDS.NAME]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Sania Arooj"
            label="Name"
            required
            error={getFieldError(FORM_FIELDS.NAME)}
          />

          {/* Email */}
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
          {/* Salary fields */}
          <div className="flex gap-6">
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

            {/*Designation fields */}
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

            {/*Account Number fields */}
            <FormField
              id={FORM_FIELDS.ACCOUNT_NUMBER}
              name={FORM_FIELDS.ACCOUNT_NUMBER}
              type="number"
              value={values[FORM_FIELDS.ACCOUNT_NUMBER]}
              onChange={handleChange}
              onBlur={handleBlur}

              label="Account Number"
              required
              error={getFieldError(FORM_FIELDS.ACCOUNT_NUMBER)}
            />
          </div>

          <Button
            label={isLoading ? "Creating Account..." : "Create Employee"}
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
