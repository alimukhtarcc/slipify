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
    [FORM_FIELDS.EMAIL]: "",
    [FORM_FIELDS.FIRST_NAME]: "",
    [FORM_FIELDS.LAST_NAME]: "",
    [FORM_FIELDS.PASSWORD]: "",
    [FORM_FIELDS.CONFIRM_PASSWORD]: "",
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

          {/* name */}
          <div className="flex gap-6">
            <FormField
              id={FORM_FIELDS.FIRST_NAME}
              name={FORM_FIELDS.FIRST_NAME}
              type="text"
              value={values[FORM_FIELDS.FIRST_NAME]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Hassan"
              label="First Name"
              required
              error={getFieldError(FORM_FIELDS.FIRST_NAME)}
            />

            <FormField
              id={FORM_FIELDS.LAST_NAME}
              name={FORM_FIELDS.LAST_NAME}
              type="text"
              value={values[FORM_FIELDS.LAST_NAME]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Abdullah"
              label="Last Name"
              required
              error={getFieldError(FORM_FIELDS.LAST_NAME)}
            />
          </div>

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
              id={FORM_FIELDS.PASSWORD}
              name={FORM_FIELDS.PASSWORD}
              type="password"
              value={values[FORM_FIELDS.PASSWORD]}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Salary"
              required
              error={getFieldError(FORM_FIELDS.PASSWORD)}
            />

            {/*Designation fields */}
            <FormField
              id={FORM_FIELDS.CONFIRM_PASSWORD}
              name={FORM_FIELDS.CONFIRM_PASSWORD}
              type="password"
              value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="*********"
              label="Designation"
              required
              error={getFieldError(FORM_FIELDS.CONFIRM_PASSWORD)}
            />

            {/*Account Number fields */}
            <FormField
              id={FORM_FIELDS.CONFIRM_PASSWORD}
              name={FORM_FIELDS.CONFIRM_PASSWORD}
              type="password"
              value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="*********"
              label="Account Number"
              required
              error={getFieldError(FORM_FIELDS.CONFIRM_PASSWORD)}
            />
          </div>

          <Button
            label={isLoading ? "Creating Account..." : "Create Account"}
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
