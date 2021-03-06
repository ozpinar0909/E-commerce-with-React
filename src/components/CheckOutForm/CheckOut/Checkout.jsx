import React,{useState,useEffect} from "react";
import {
  Paper,
  Stepper,
  Step,
  Typography,
  CircularProgress,
  Divider,
  Button,
  StepLabel,
} from "@material-ui/core";
import {commerce} from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';

const steps=['Shipping adress','Payment Details'];
const Checkout = ({cart}) => {
    const[activeStep,setActiveStep]=useState(0);
    const[checkoutToken,setCheckoutToken]=useState(null);
    const[shippingData,setShippingData]=useState({});
    const classes = useStyles();
    useEffect(()=>{
      const generateToken=async()=>{
        try {
          const token=await commerce.checkout.generateToken(cart.id,{type:'cart'});
          console.log(token)
          setCheckoutToken(token)
        } catch (error) {
          
        }
       
      }
      generateToken();

    },[cart])
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const next=(data)=>{
    setShippingData(data);
    nextStep();
  }
    const Confirmation=()=>(
      <div>
        Conformation
      </div>
    )
    const Form =()=>activeStep===0
    ?<AddressForm checkoutToken={checkoutToken} next={next}/>
    :<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken}/>
    return (
      
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            CheckOut
          </Typography>
          <Stepper activeStep={0} className={classes.stepper}>
                {steps.map((step)=>(
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
          </Stepper>
          {activeStep===steps.length ? <Confirmation/>:checkoutToken&&<Form/>}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
