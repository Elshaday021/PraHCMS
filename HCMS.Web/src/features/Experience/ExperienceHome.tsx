import AddICon from '@mui/icons-material/Add';
import {useState} from 'react';
import { EmployeeList } from '../Employee/EmployeeList';
import { useGetAllEmployeesQuery } from '../../app/api';
import { PageHeader } from '../../components/PageHeader';
import { EmployeeDialog } from '../Employee/EmployeeDialog';
import { Typography } from '@mui/material';
import {Box} from '@mui/material';
import{Button} from '@mui/material';

 const  Header=({text}:{text:string})=>{
    <Typography sx={{ lineHeight: 2.5, flex: 1, pt: 2, display: "block" }}
     variant="h5"
     color="secondary">
       {text}
    </Typography>
 }

 export const employeesName=()=>{
    const [dialogOpened,setDialogOpened]=useState(false);
    const {data}=useGetAllEmployeesQuery();
    return (

        <Box>
            <PageHeader title={"Employees"} icon="undefined"/>
            <Box sx={{diaplay:"flex",gap:1}}>
                 <Box sx={{felx:1}}></Box>
                 <Button 
                 variant="outlined"
                 startIcon={<AddICon/>}
                 onClick={()=>{
                    setDialogOpened(true);
                 }}
                 >
                      Add Employee
                 </Button>
            </Box>
            {dialogOpened && (
        <EmployeeDialog
          onClose={() => {
            setDialogOpened(false);
          }}
        />
      )}
      <Box>
        <EmployeeList items={data} />
      </Box>
    </Box>
    );
 };



