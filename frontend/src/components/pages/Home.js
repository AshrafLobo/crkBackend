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
import { Modal, Toast } from "../reusable";
import { DataProvider, useAuth } from "../../utilities";
import Logo from "../../images/logo.png";

function Home(props) {
  /** Authentication */
  const auth = useAuth();
  const provider = new DataProvider();
  const {
    isProxy,
    ID_RegCert_No: idNumber,
    email: user_email,
    company,
  } = jwt_decode(auth.token);

  /** Set user data */
  const [user, setUser] = useState({});
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [attending, setAttending] = useState(false);
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

      const response = await provider.get(`attendance/${idNumber}`, {
        "x-auth-token": auth.token,
      });

      if (response.data.length > 0) {
        setHasConfirmed(true);
        setAttending(true);
      }
    })();
  }, []);

  /** State for attending meeting */
  const [openModal, setOpenModal] = useState(false);
  const [toastOpt, setToastOpt] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  /** Handle proxy creation */
  const handleCreateProxy = async (values) => {
    try {
      setOpenModal(false);

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

      const response = await provider.post("proxy", payload, {
        "x-auth-token": auth.token,
      });

      if (response.status === 200) {
        setToastOpt({
          open: true,
          severity: "success",
          message: "Proxy created successfully",
        });
      } else {
        setToastOpt({
          open: true,
          severity: "success",
          message: response.data,
        });
      }
    } catch (error) {
      setToastOpt({
        open: true,
        severity: "error",
        message: "An error occured",
      });
    }
  };

  const handleAttendance = async () => {
    try {
      const response = await provider.post(
        "attendance",
        {
          MemberNo: idNumber,
          ID_RegCert_No: idNumber,
          email: user_email,
        },
        {
          "x-auth-token": auth.token,
        }
      );

      setHasConfirmed(true);
      if (response.status === 200) {
        setToastOpt({
          open: true,
          severity: "success",
          message: "Successfully confirmed attendance",
        });
      } else {
        setToastOpt({
          open: true,
          severity: "success",
          message: response.data,
        });
      }
    } catch (e) {
      setToastOpt({
        open: true,
        severity: "error",
        message: "An error occured",
      });
    }
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
            <Typography variant="h5">
              Please confirm your attendance of {company} AGM meeting
            </Typography>
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
                  disabled={hasConfirmed || isProxy}
                />
              }
            />

            <Button
              variant="contained"
              size="small"
              disabled={hasConfirmed || attending === true}
              onClick={handleAttendance}
            >
              Confirm attendance
            </Button>

            <Divider>
              <Typography fontWeight="bold">OR</Typography>
            </Divider>

            <Button
              variant="contained"
              size="small"
              disabled={hasConfirmed || isProxy || attending}
              onClick={() => setOpenModal(true)}
            >
              Create proxy
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Modal
        title="Create proxy"
        body={<CreateProxyForm handleCreateProxy={handleCreateProxy} />}
        open={openModal}
        setOpen={setOpenModal}
      />

      <Toast
        open={toastOpt.open}
        handleClose={() => setToastOpt({ ...toastOpt, open: false })}
        severity={toastOpt.severity}
      >
        {toastOpt.message}
      </Toast>
    </Container>
  );
}

export default Home;
