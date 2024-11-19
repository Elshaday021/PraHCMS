import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import {
  DialogHeader,
  FormSelectField,
  FormTextField,
} from "../../../components";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import {
  JobGrade,
  useUpdateJobGradeMutation,
  useGetJobGradeByIdQuery,
} from "../../../app/api/HCMSApi";
import { useParams } from "react-router-dom";
import { StringDecoder } from "string_decoder";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import * as Yup from "yup";
const emptyjobGradeData = {
  name: "",
  description: "",
} as any;
interface JobGradeDialogProps {
  onClose: () => void;
  Id?: number;
}
export const JobGradeDialogUpdate = ({ onClose, Id }: JobGradeDialogProps) => {
  const [jobGradeData, setJobGradeData] = useState<JobGrade>();
  const [message, setMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();
  const {
    data: jobGrade,
    isLoading,
    error,
  } = useGetJobGradeByIdQuery({ id: Id });
  const [updateJobGrade] = useUpdateJobGradeMutation();
  useEffect(() => {
    if (jobGrade) {
      setJobGradeData({
        ...emptyjobGradeData,
        ...jobGrade,
      });
    }
  }, [jobGrade]);
  const handleSubmit = useCallback(
    (values: JobGrade) => {
      updateJobGrade({
        jobGradeUpdateCommand: values,
      })
        .unwrap()
        .then(() => {
          setAlertSeverity("success");
          setMessage("Job Grade updated successfully!");
        })
        .catch((error) => {
          setAlertSeverity("error");
          setMessage(`Update failed: ${error.message}`);
        });
    },
    [onClose, updateJobGrade]
  );
  const JobGradeSchema = Yup.object({
    name: Yup.string()
      .required("Name of Job Grade is required")
      .min(3, "The Name of the job Grade is Atleaset 3 characters"),
    description: Yup.string()
      .required("The Description of the updated JobGrade is required")
      .min(4, "The Description of the updated JobGrade is atleast 4"),
  });
  return (
    <Dialog
      scroll={"paper"}
      disableEscapeKeyDown={true}
      maxWidth={"md"}
      open={true}
    >
      {message && (
        <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2}>
          <Alert severity={alertSeverity} onClose={() => setMessage(null)}>
            <AlertTitle>
              {alertSeverity === "success" ? "Success" : "Error"}
            </AlertTitle>
            {message}
          </Alert>
        </Stack>
      )}
      {!!jobGradeData && (
        <Formik
          initialValues={jobGradeData}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={JobGradeSchema}
          validateOnChange={true}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogHeader title="update Job Grade" onClose={onClose} />
              <DialogContent dividers={true}>
                <Grid container spacing={2}>
                  {/* {errors && (
                  <Grid item xs={12}>
                    <Errors errors={errors as any} />
                  </Grid>
                )} */}

                  <Grid item xs={12}>
                    <FormTextField
                      name="name"
                      label="Job Grade Name"
                      type="text"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormTextField
                      name="description"
                      type="text"
                      placeholder="Description"
                      label="Description"
                      fullWidth
                      multiline
                      minRows={5}
                      variant="outlined"
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="primary" variant="outlined" type="submit">
                  Update
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};
