import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import EventTypeForm from './step1';
import VenueForm from './step2';
import AccommodationForm from './step3';
import TransportationForm from './step4';
import PaymentForm from './payment';
import Header from '../Header';

const steps = ['Event Type', 'Venue', 'Accommodation', 'Transportation', 'Payment'];

const BookingStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [bookingData, setBookingData] = useState({});

  const handleNext = (data) => {
    setBookingData(prev => ({ ...prev, ...data }));
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0: return <EventTypeForm onNext={handleNext} />;
      case 1: return <VenueForm onNext={handleNext} onBack={handleBack} />;
      case 2: return <AccommodationForm onNext={handleNext} onBack={handleBack} />;
      case 3: return <TransportationForm onNext={handleNext} onBack={handleBack} />;
      case 4: return <PaymentForm data={bookingData} onBack={handleBack} />;
      default: return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <>
    <br />
    <Header />
    <br />
    <br />
    
      <div style={{padding:"100px"}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>
      <br />
      <br />
      <br />
    <br />
      <div>{getStepContent(activeStep)}</div>
      </div>
    </>
  );
};

export default BookingStepper;
