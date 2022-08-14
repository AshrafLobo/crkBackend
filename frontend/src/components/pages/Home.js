import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import jwt_decode from "jwt-decode";

import { CreateProxyForm, ProfileEditForm } from "../forms";
import Modal from "../reusable/Modal";
import { DataProvider, useAuth } from "../../utilities";
import Logo from "../../images/logo.png";

function Home(props) {
  /** Authentication */
  const auth = useAuth();
  const provider = new DataProvider();
  const { isProxy, ID_RegCert_No: idNumber } = jwt_decode(auth.token);

  /** Set user data */
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      let url = "user";
      if (isProxy) url = "proxy";

      /** Get user data */
      const { data } = await provider.get(`${url}/${idNumber}`, {
        "x-auth-token": auth.token,
      });

      /** Initialize data */
      let { full_name = "", ID_RegCert_No = "", email = "" } = data;

      /** Set user state */
      setUser({
        name: full_name,
        ID_RegCert_No: ID_RegCert_No,
        email: email,
      });
    })();
  }, []);

  /** State for attending meeting */
  const [attending, setAttending] = useState(false);
  const [open, setOpen] = useState(false);

  /** Handle proxy creation */
  const handleCreateProxy = async (values) => {
    setOpen(false);

    const { full_name, email, ID_RegCert_No } = values;

    /** Get user data */
    const {
      data: { MemberNo: users_MemberNo },
    } = await provider.get(`user/${idNumber}`, {
      "x-auth-token": auth.token,
    });

    /** Create payload */
    const payload = {
      users_MemberNo,
      full_name,
      email,
      ID_RegCert_No,
    };

    await provider.post("proxy", payload, {
      "x-auth-token": auth.token,
    });
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton>
            <img src={Logo} alt="Logo" width="50px" height="50px" />
          </IconButton>

          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            Comp-rite AGM Registration
          </Typography>
          <Button
            color="primary"
            onClick={() => auth.logout()}
            variant="contained"
            endIcon={<Logout />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container justifyContent="center" my={10}>
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
          <Stack spacing={1} my={3}>
            <Typography variant="h5">Please confirm your details</Typography>
          </Stack>

          <ProfileEditForm disabled={true} user={user} isProxy={isProxy} />

          <Stack direction="column" spacing={2} my={5}>
            <FormControlLabel
              label="I will attend the AGM meeting"
              control={
                <Checkbox
                  checked={isProxy || attending}
                  onChange={() => setAttending(!attending)}
                  size="small"
                  disabled={isProxy}
                />
              }
            />

            <Divider>
              <Typography fontWeight="bold">OR</Typography>
            </Divider>

            <Button
              variant="contained"
              size="small"
              disabled={isProxy || attending}
              onClick={() => setOpen(true)}
            >
              Create proxy
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Modal
        title="Create proxy"
        body={<CreateProxyForm handleCreateProxy={handleCreateProxy} />}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
}

export default Home;
