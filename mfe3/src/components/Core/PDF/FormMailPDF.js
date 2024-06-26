import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import EmailController from 'components/Core/Controller/EmailController'
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js";
import Icon from "@mui/material/Icon";
import ComparePDFDocument from 'components/Core/PDF/ComparePDFDocument';
import { BlobProvider } from '@react-pdf/renderer';
import Axios from 'axios'
import useBudgetPlans from 'utils/hooks/useBudgetPlans';


const defaultValues = {
  Correo_destinatario :'',
  Correo_copia:'',
  Correo_copia_oculta:'',
};
export default function FormMailPDF(props) {
  //const { handleSubmit, ...objForm } = useForm();
  const methods = useForm({defaultValues});
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;


  const { handleClose, objPDF} = props;
  const { infoClient } = objPDF;
  const budgetPlans = useBudgetPlans(objPDF);
  const [visiblePDF,setVisiblePDF] = useState(false);
  const [transformedPlans,setTransformedPlans] = useState(null)
  let blobPDF = null;


  const handleVisiblePDF = (value) =>{
    setVisiblePDF(value);
  }

  const onSubmit = async (data) => {
    const dataForm = new FormData();
    const subject =  `Cotización: ${infoClient[0].BUDGET_ID}`
    const textBody = `Tenemos el agrado de enviarle su cotización con el número: ${infoClient[0].BUDGET_ID}`
    dataForm.append('pdfFile', blobPDF, 'Cotizacion.pdf');
    dataForm.append('email_info', JSON.stringify({...data, subject: subject, text: textBody}))
    await Axios.post('/send_mail', dataForm);
    handleClose()
  };


  useEffect(() =>{
    budgetPlans.length > 0 && handleVisiblePDF(true);
    budgetPlans.length > 0 && setTransformedPlans(budgetPlans);
  },[budgetPlans])

  return (
    <>
    { visiblePDF && transformedPlans &&
      <BlobProvider
        document={<ComparePDFDocument objPDF={objPDF} budgetPlans={transformedPlans} />}
      >
        {({ blob, url, loading, error }) => {
          if (loading) {
            return <span>cargando...</span>
          } else {
            blobPDF = blob;
            return (
              <form onSubmit={handleSubmit(onSubmit)}>
                <EmailController control={control} label="Destinatario" name="Correo_destinatario" fullWidth />
                <EmailController control={control} label="Copia" name="Correo_copia" fullWidth required={false}/>
                <EmailController control={control} label="Copia Oculta" name="Correo_copia_oculta" fullWidth required={false}/>
                <Button color="primary" type="submit" fullWidth><Icon>send</Icon> Enviar correo</Button>
              </form>
            )
          }
        }}
      </BlobProvider>
    }
    </>
  );
}