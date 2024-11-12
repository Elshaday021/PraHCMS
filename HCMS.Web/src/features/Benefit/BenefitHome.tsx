import {useState,useEffect} from 'react';
import AddIcon from "@mui/icons-material/Add";
import { PageHeader } from '../../components/PageHeader';
import SetupMenu from "../Job/SetupMenu";
import { useNavigate } from 'react-router-dom';
import { useGetAllBenefitQuery } from '../../app/api';
import { Typography ,Box,Button} from '@mui/material';
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { BenefitDialog } from './BenefitDialog';
import {BenefitList} from './BenefitList';
const Header=({text}:{text:string})=>{
<Typography
variant="h5"
color="secondary"
sx={{ lineHeight: 2.5, flex: 1, pt: 2, display: "block" }}
>
    {text} 
</Typography>
}
export const BenefitHome=()=>{
    const [dialogOpened,setDialogOpened]=useState(false);
    const { data } = useGetAllBenefitQuery();
    const Items=Array.isArray(data)?data:[];  //  const navigate=useNavigate();
  return(
    <Box>
    <SetupMenu/>
    <Box sx={{display:"flex"}}>
    <PageHeader title={"Benefit"}
    icon={"undefined"}
    />
    <Box sx={{flex:1}}></Box>
      <Button
      variant="outlined"
      startIcon={<AddIcon/>}
      onClick={()=>{
        setDialogOpened(true);
      }}
      sx={{
        color: "#fff", // Text color
        borderColor: "#1976d2", // Border color
        backgroundColor: "#1976d2",
        "&:hover":{
           backgroundColor:"vilolet",
                   color:"1976d2",  
                borderColor:"#1976d2",    
          }
      }}>
      Add Benefit
      </Button>
    </Box>
    {dialogOpened&&(
    <BenefitDialog
    onClose={()=>{
        setDialogOpened(false);
    }}
    />
    )}
 <Box>
 <BenefitList items={Items} /> 
 </Box>
</Box>

  );
};