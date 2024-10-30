import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { JobTitleDto } from "../../../app/api";

interface JobTitleListProps {
  items?: JobTitleDto[];
  hideWorkflowComment?: boolean;
  suppressActionColumn?: boolean;
}

export const JobTitleList = ({
  items = [],
  hideWorkflowComment,
  suppressActionColumn,
}: JobTitleListProps) => {
  const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitleDto>();

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Job Catagory</TableCell>
                <TableCell>Job Grade</TableCell>
                <TableCell>Description</TableCell>
                {/* {!suppressActionColumn && (
                  <TableCell align="center">Actions</TableCell>
                )} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {(items || []).map((item) => (
                <Fragment key={item.id}>
                  <TableRow
                    hover={false}
                    key={item.id}
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
                      {item.title}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      {item.jobCatagory}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      {item.jobGrade}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      {item.description}
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        verticalAlign: "top",
                      }}
                    >

                    </TableCell>
               */}
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
