

import {Form,Formik} from "formik";
import { useCallback,useEffect,useState } from 'react';
import { DialogHeader,FormSelectField,FormTextField } from '../../components';
import {
Box,Grid,Dialog,DialogActions,DialogContent,Button}
 from "@mui/material";
 import dayjs from 'dayjs'
 import { removeEmptyFields } from "../../utils";
 import {
    BusinessUnitDto,
    CreateEmployeeProfileCommand,
    EmployeeDto,
    useCreateBusinessUnitMutation,
    useCreateEmployeeProfileMutation,
  } from "../../app/api/HCMSApi";
  import { useBusinessUnit } from "../BusinessUnit/useBusinessUnits";
  import { useJobTitle } from "../Job/JobTitle/useJobTitle";
  import { enums } from "../../app/api";

  const emptyEmployeeData={
    employeeName:"",
    employeeID:""
  } as any;

  export const EmployeeDialog=({onClose}:{onClose:()=>void})=>{
    const [EmployeeData, setEmployee] = useState<CreateEmployeeProfileCommand>(emptyEmployeeData);
    const [addEmployee] = useCreateEmployeeProfileMutation();
     const {jobTitlesLookups}=useJobTitle();
     const {businessUnitLookups}=useBusinessUnit();

     useEffect(()=>{
      setEmployee({
        ...emptyEmployeeData,
        EmployeeData
      });
     },[emptyEmployeeData,EmployeeData]);
  

  const handleSubmit = useCallback(
    (values: CreateEmployeeProfileCommand) => {
      const birthDate = dayjs(values.birthDate).format("YYYY-MM-DD");
      const employementDate = values.employementDate && dayjs(values.employementDate).format("YYYY-MM-DD");
      const payload = removeEmptyFields({ ...values, birthDate, employementDate });

      addEmployee({
        createEmployeeProfileCommand: payload
      }) 
        .unwrap()
        .then(onClose);
    },
    [onClose, addEmployee]
  );
  return 
  (
<Dialog
open={true}
maxWidth="md"
scroll={"paper"}
disableEscapeKeyDown={true}
>
{!!EmployeeData && (
<Formik initialValues={EmployeeData} enableReinitialize={true} onSubmit={handleSubmit}>
<Form>
<DialogHeader title='Add Employee' onClose={onClose}/>
<DialogContent dividers={true}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{display:"flex",gap:1}}>
        <FormTextField
        name="name"
        label="Employee fullName"
        type="text"
        />
        <FormTextField
        name="BirthDate"
        label="Employee Birth Date"
        type="date"
        />
         </Box>
        </Grid>
        <Grid item xs={24}>
            <Box sx={{display:"flex",gap:1}}>
                <FormSelectField
                name="gender"
                label="Gender"
                options={[
                     {
                     label:"Male",
                     value:enums.Gender.Male
                     },{
                    label:"Female",
                    value:enums.Gender.Female
                     }
                ]}
                />
                <FormSelectField
                 name="maritalStatus"
                 label="Marital Status"
                 options={[
                    {label:"Single",
                     value:enums.MartialStatus.Single
                    },
                     {
                        label:"Married",
                        value:enums.MartialStatus.Married
                     },
                     {
                        label:"Widowed",
                        value:enums.MartialStatus.Widowed
                     },
                     {
                        label:"Divorced",
                        value:enums.MartialStatus.Divorced
                     }
                 ]}

                
                />

            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box sx={{display:"flex", gap:1}}>
             <FormSelectField
             name="BussinessUnitId"
             label="Bussiness unit"
             options={businessUnitLookups}
             />
             <FormSelectField
             name="JobtitleId"
             label="Jobtitile"
             options={jobTitlesLookups}/>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <FormTextField
              name="EMploymentDate"
              label="EMployment Date"
              type="date"
             />
        </Grid>
    </Grid>
</DialogContent>
<DialogActions sx={{p:2}}>
    <Button onClick={onClose}>Cancel</Button>
    <Button color="secondary" variant="outlined" type="submit">Save</Button>
</DialogActions>
</Form>
</Formik>
)}
</Dialog>
  );

};