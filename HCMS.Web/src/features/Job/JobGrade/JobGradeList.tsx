import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { JobGrade } from "../../../app/api";
import { useNavigate } from "react-router-dom";
import { JobGradeDialogUpdate } from "./JobGradeDialogUpdate";
import { useRejectJobGradeMutation, useSubmitJobGradeMutation, useApproveJobGradeMutation } from "../../../app/api";
interface JobGradeListProps {
  items?: JobGrade[];
  hideWorkflowComment?: boolean;
  suppressActionColumn?: boolean;
}
export const JobGradeList = ({
  items = [],
  hideWorkflowComment,
  suppressActionColumn,
}: JobGradeListProps) => {
  const [selectedJobGrade, setSelectedJobGrade] = useState<JobGrade | null>(
    null
  );
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | undefined>();
  const handleDialogOpen = (id: number) => {
    setDialogOpened(true);
    setSelectedId(id);
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage(null);
        setAlertSeverity(undefined);
      }, 300);
      return clearTimeout(timeout);
    }
  }, [message])
  const [submit] = useSubmitJobGradeMutation();
  const [Approve] = useApproveJobGradeMutation();
  const [Reject] = useRejectJobGradeMutation();
  const handleSubmit = (id: number) => {
    submit({ id })
      .unwrap()
      .then(() => {
        setAlertSeverity("success");
        setMessage("Job Grade Submitted successfully!");
        setTimeout(()=>{
          setMessage(null);
          setAlertSeverity(undefined);
        },1000)
      })
      .catch((error) => {
        setAlertSeverity("error");
        setMessage(`Submission failed: ${error.message}`);
        setTimeout(()=>{
          setMessage(null);
          setAlertSeverity(undefined);
        },1000)
      });
  }
  const handleApprove = (id: number) => {
    Approve({ id })
      .unwrap()
      .then(() => {
        setAlertSeverity("success");
        setMessage("Job Grade Approved successfully!");
        setTimeout(()=>{
          setMessage(null);
          setAlertSeverity(undefined);
        },1000)
      })
      .catch((error) => {
        setAlertSeverity("error");
        setMessage(`Approval failed: ${error.message}`);
        setTimeout(()=>{
          setMessage(null);
          setAlertSeverity(undefined);
        },1000)
      });
  }
  const handleReject = (id: number) => {
    Reject({ id })
      .unwrap()
      .then(() => {
        setAlertSeverity("success");
        setMessage("Job Grade Rejected successfully!");
        setTimeout(()=>{
          setMessage(null);
          setAlertSeverity(undefined);
        },1000)
      })
      .catch((error) => {
        setAlertSeverity("error");
        setMessage(`Rejection failed: ${error.message}`);
        setTimeout(()=>{
          setMessage(null);
          setAlertSeverity(undefined);
        },1000)
      });
  }
  const handleDialogClose = () => {
    setDialogOpened(false);
    setSelectedId(null);
  };
  return (
    <Box>
      {alertSeverity && message && (
        <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2}>
          <Alert severity={alertSeverity} onClose={() => setMessage(null)}>
            <AlertTitle>{alertSeverity === "success" ? "Success" : "Error"}</AlertTitle>
            {message}
          </Alert>
        </Stack>
      )}
      <Paper>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(items || []).map((item) => (
                <Fragment key={item.value}>
                  <TableRow
                    hover={false}
                    key={item.value}
                    sx={
                      !hideWorkflowComment
                        ? {
                          cursor: "pointer",
                          "& > *": { borderBottom: "unset" },
                        }
                        : {}
                    }
                  >
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      {item.name}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      {item.description}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      <Button
                        onClick={() => handleDialogOpen(item.value as number)}
                        variant="contained"
                        color="secondary">
                        Update
                      </Button>
                      <Button
                        onClick={() => handleSubmit(item.value as number)}
                        variant="contained"
                        color="primary">
                        submit
                      </Button>
                      <Button
                        onClick={() => handleApprove(item.value as number)}
                        variant="contained"
                        color="secondary">
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(item.value as number)}
                        variant="contained"
                        color="primary">
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {dialogOpened && selectedId !== null && (
        <JobGradeDialogUpdate onClose={handleDialogClose} Id={selectedId} />
      )}
    </Box>
  );
};
