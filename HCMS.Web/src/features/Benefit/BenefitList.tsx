
import {Box,Paper,Table,TableCell,TableContainer,TableBody,TableRow,TableHead} from '@mui/material'
import {Fragment,useState} from 'react';
import { BenefitDto } from '../../app/api';
interface BenefitListProps{
    items?: BenefitDto[]; // Adjust the type to accept both a single object and an array
    hideWorkflowComment?: boolean;
    suppressActionColumn?: boolean;
};
export const BenefitList=({
    items=[],
hideWorkflowComment,
suppressActionColumn}:BenefitListProps)=>{
const [BenefitList,setBenefitListData]=useState<BenefitDto>();
return(
<Box>
    <Paper>
        <TableContainer>
            <Table size="medium">
                <TableHead>
                  <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Benefit Type</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Description</TableCell>
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
                      {item.name}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      {item.benefitType}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", width: 200 }}>
                      {item.description}
                    </TableCell>
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