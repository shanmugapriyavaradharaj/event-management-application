import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import successAnimation from './success.json'; // Ensure this JSON has a tick animation
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-400 to-blue-500">
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Card sx={{ maxWidth: 400, textAlign: 'center', p: 4, borderRadius: 4, boxShadow: 6, backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                    <CardContent>
                        <Lottie animationData={successAnimation} style={{ width: 150, height: 150, margin: "0 auto" }} />
                        <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
                            Payment Successful!
                        </Typography>
                        <Typography variant="body1" color="white" gutterBottom>
                            Your transaction was completed successfully.
                        </Typography>
                        <Link to={"/admin"}>
                        
                        <Button 
                            variant="contained" 
                            sx={{ mt: 2, backgroundColor: "white", color: "green", '&:hover': { backgroundColor: "#d4edda" } }}
                        >
                            Go to Dashboard
                        </Button>
                        </Link>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
