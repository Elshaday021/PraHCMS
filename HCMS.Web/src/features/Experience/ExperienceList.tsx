import { HideImage } from '@mui/icons-material';
import {
    Box,
    Paper,
    Table,
    TableCell,
    TableRow,
    TableContainer,
    TableBody,
    TableHead
} from '@mui/material';
import {Fragment,useState} from 'react';
import { EmployeeDto } from "../../app/api/HCMSApi";

interface EmployeeListProps {
    items?:EmployeeDto[];
    hideWorkflowComment?:boolean;
  suppressActionColumn?:boolean;
    
}
export const EmployeeList=({
    items =[],
    hideWorkflowComment,
    suppressActionColumn
}:EmployeeListProps)=>{
    const [selectedEmployee,setSelectedEmployee]=useState<EmployeeDto>();
    return (
        <Box>
            <Paper>
                <TableContainer >
                    <Table size="medium">
      <TableHead>
        <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>BussinssUnit</TableCell>
            <TableCell>JobTitle</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Employement Date</TableCell>
            <TableCell>Marital status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
       {(items||[]).map((item)=>(
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
                <TableCell sx={{verticalAlign:"top",width:200}}>{item.employeeId}</TableCell>
                <TableCell sx={{verticalAlign:"top",width:200}}>{item.employeeName}</TableCell>
                <TableCell sx={{verticalAlign:"Top",widht:200}}>{item.gender}</TableCell>
                <TableCell sx={{verticalAlign:"top",width:200}}>{item.birthDate}</TableCell>
                <TableCell sx={{verticalAlign:"top",width:200}}>{item.businessUnit}</TableCell>
                <TableCell sx={{VertcalAlign:"top",widht:200}}>{item.employementDate}</TableCell>
             </TableRow>

           </Fragment>
       ))}
      </TableBody>
    </Table>
    </TableContainer>
    </Paper>
    </Box>
    );
}
