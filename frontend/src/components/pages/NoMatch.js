import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NoMatch(props) {
  const navigate = useNavigate();

  return (
    <Grid container justifyContent="center" alignContent="center" my={10}>
      <Grid
        item
        xs={11}
        md={6}
        p={6}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
        }}
      >
        <Box spacing={1}>
          <Typography variant="h6" textAlign="center">
            404 Page Not Found
          </Typography>
          <Typography variant="body1" textAlign="center" mb={4}>
            The page you are looking for does not exist
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default NoMatch;
