import { Button, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <LockIcon sx={{ fontSize: 80, color: "#ff1744" }} />
        <Typography variant="h2" color="error" fontWeight={700}>
          403
        </Typography>
      </motion.div>
      <Typography variant="h5" mt={2}>
        Oops! You are not authorized to access this page.
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1rem", borderRadius: "20px" }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      </motion.div>
    </Container>
  );
}