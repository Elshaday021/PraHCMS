
import { Form, Formik, ErrorMessage } from 'formik'
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, FormHelperText } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { DialogHeader, FormTextField, FormSelectField } from '../../components';
import { useCreateBenefitMutation, BenefitDto } from '../../app/api';
import { enums } from '../../app/api';
import { add } from 'lodash-es';
import { PageHeader } from '../../components/PageHeader';
import * as Yup from 'yup';
import { CurrencyYuanSharp, TouchAppRounded } from '@mui/icons-material';
const emptyBenefit = {
  Name: "",
  Description: ""
} as any;
export const BenefitDialog = ({ onClose }: { onClose: () => void }) => {
  const [BenefitData, setBenefitData] = useState<BenefitDto>();
  const [AddBenefit] = useCreateBenefitMutation();
  useEffect(() => {
    setBenefitData({
      ...emptyBenefit,
      ...BenefitData
    })
  }, [emptyBenefit, BenefitData]);

  const handleSubmit = useCallback((values: BenefitDto) => {
    AddBenefit
      ({ createBenefitCommand: values })
      .unwrap()
      .then(() => onClose());
  }, [onClose, AddBenefit]);

  const handleSubmit1 = useCallback((value: BenefitDto) => {
    AddBenefit({ createBenefitCommand: value }).unwrap().then(() => onClose());
  }, [onClose, AddBenefit]);

  const handleButtonAction = useCallback((value: BenefitDto) => {
    AddBenefit({ createBenefitCommand: value }).unwrap().then(() => onClose());
  }, [onClose, AddBenefit]);

  const BenefitValidation = Yup.object({
    name: Yup.string().
      required()
      .min(2, "Name must be at least 2 characters"),
    benefitType: Yup.number()
      .required()
      .min(1, "Benefit type Can not be less than 1")
      .max(4, "Benefit Type Can  not be more than 5"),
    description: Yup.string()
      .required().
      min(2, "Description Name must be at least two characters")
  });

  return (
    <Dialog
      scroll={"paper"}
      disableEscapeKeyDown={true}
      open={true}
      maxWidth={"md"}
    >
      {!!BenefitData && (
        <Formik
          initialValues={BenefitData}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          valueOnChange={true}
          validationSchema={BenefitValidation}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogHeader title="Add Benefit" onClose={onClose} />
              <DialogContent dividers={true}>
                <Grid spacing={2}>
                  <Grid item xs={12}>
                    <FormTextField
                      name="name"
                      label="Benefit Name"
                      type="text"
                      error={Boolean(errors.name && touched.name)}
                      helperText={
                        touched.name && Error.name ? (
                        <FormHelperText error >
                          {errors.name}
                        </FormHelperText>) : null
                      }
                    />
                    <FormSelectField
                      name="benefitType"
                      label="Benefit Type"
                      type="number"
                      options={[
                        {
                          label: "Medical",
                          value: enums.BenefitType.Medical,
                        },
                        {
                          label: "Transport",
                          value: enums.BenefitType.Transport,
                        },
                        {
                          label: "House",
                          value: enums.BenefitType.House
                        }
                      ]}
                      error={Boolean(errors.benefitType && touched.benefitType)}
                      helperText={errors.benefitType && touched.benefitType ? (
                        <FormHelperText error>
                          {errors.benefitType}
                        </FormHelperText>
                      ) : null
                      }
                    />
                    <FormTextField
                      name="description"
                      label="Benefit Description"
                      type="text"
                      error={Boolean(errors.description && touched.description)}
                      helperText={errors.description && touched.description ? (
                        <FormHelperText error>
                          {errors.description}
                        </FormHelperText>
                      ) : null
                      }
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="outlined" type="submit">Save</Button>
              </DialogActions>
            </Form>

          )}
        </Formik>
      )}
    </Dialog>

  );
}