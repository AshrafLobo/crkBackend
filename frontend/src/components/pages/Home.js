import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
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
  const [userLiveToken, setUserLiveToken] = useState("");
  const [proxy, setProxy] = useState({});
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [attending, setAttending] = useState(false);
  const [attendingOpts, setAttendingOpts] = useState({
    isAttending: "PENDING",
    color: "default",
  });
  const [videoLink, setVideoLink] = useState("");
  const [liveOpts, setLiveOpts] = useState({
    liveStatus: "PENDING",
    color: "default",
  });
  useEffect(() => {
    (async () => {
      let url = "user";
      if (isProxy) url = "proxy";

      /** Get user data */
      const { data } = await provider.get(`${url}/${idNumber}`, {
        "x-auth-token": auth.token,
      });

      /** Initialize data */
      let {
        full_name = "",
        ID_RegCert_No = "",
        email = "",
        live_token = "",
      } = data;

      /** Set user state */
      setUser({
        name: full_name,
        ID_RegCert_No: ID_RegCert_No,
        email: email,
      });

      /** Set live token */
      setUserLiveToken(live_token);

      const live = await provider.get("live", {
        "x-auth-token": auth.token,
      });
      if (live.data && live.data.is_active !== "pending") {
        if (live.data.is_active === "false") {
          setLiveOpts({
            liveStatus: "STREAM ENDED",
            color: "error",
          });
        } else {
          setLiveOpts({
            liveStatus: "LIVE",
            color: "success",
          });
        }

        setVideoLink(live.data.video_link);
      }

      const response = await provider.get(`attendance/${idNumber}`, {
        "x-auth-token": auth.token,
      });

      if (response.data.length > 0) {
        setHasConfirmed(true);
        setAttending(true);
        setAttendingOpts({
          isAttending: "CONFIRMED",
          color: "success",
        });
      }

      if (!isProxy) {
        try {
          const proxyData = await provider.get(`user/getProxy/${idNumber}`, {
            "x-auth-token": auth.token,
          });

          if (
            proxyData.status === 200 &&
            Object.keys(proxyData.data).length > 0
          ) {
            setProxy(proxyData.data);
            setHasConfirmed(true);
            setAttendingOpts({
              isAttending: "CONFIRMED",
              color: "success",
            });
          }
        } catch (e) {
          console.log(e);
        }
      } else {
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

        setHasConfirmed(true);
        setAttendingOpts({
          isAttending: "CONFIRMED",
          color: "success",
        });

        setProxy({
          full_name,
          email,
          ID_RegCert_No,
        });
      } else {
        setToastOpt({
          open: true,
          severity: "default",
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

        setAttendingOpts({
          isAttending: "CONFIRMED",
          color: "success",
        });
      } else {
        setToastOpt({
          open: true,
          severity: "default",
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

  /** Handle Remove click */
  const handleRemoveProxy = async (ID_RegCert_No) => {
    const response = await provider.delete(`proxy/${ID_RegCert_No}`, {
      "x-auth-token": auth.token,
    });

    if (response.data === true) {
      setProxy({});

      setToastOpt({
        open: true,
        severity: "success",
        message: "Successfully removed proxy",
      });

      setHasConfirmed(false);
      setAttendingOpts({
        isAttending: "PENDING CONFIRMATION",
        color: "default",
      });
    }
  };

  /** Define proxy details */
  let proxyDetails = "";
  if (Object.keys(proxy).length > 0 && !isProxy) {
    proxyDetails = (
      <Stack
        direction="row"
        spacing={2}
        alignItems="baseline"
        p={1}
        bgcolor="#e5e5e5"
        width="100%"
      >
        <ListItemText
          primary={proxy.full_name}
          sx={{ color: "gray", fontWeight: "800", textTransform: "uppercase" }}
        />
        <Chip
          label="Remove"
          color="error"
          size="small"
          onDelete={() => handleRemoveProxy(proxy.ID_RegCert_No)}
        />
      </Stack>
    );
  } else if (Object.keys(proxy).length === 0 || isProxy) {
    proxyDetails = (
      <Stack
        direction="row"
        alignItems="baseline"
        p={1}
        bgcolor="#e5e5e5"
        width="100%"
      >
        <ListItemText
          primary="NO PROXY CREATED"
          sx={{ color: "gray", fontWeight: "800" }}
        />
      </Stack>
    );
  }

  return (
    <Container maxWidth="xl" disableGutters>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton>
            <img src={Logo} alt="Logo" width="40px" height="40px" />
          </IconButton>

          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            AGM Registration
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

      <Grid
        container
        justifyContent="center"
        my={10}
        rowGap={{ xs: 3, md: 0 }}
        columnGap={3}
      >
        <Grid
          item
          xs={11}
          md={5}
          p={3}
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
              disabled={hasConfirmed || attending === false}
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
        <Grid item xs={11} md={5}>
          <Card sx={{ paddingX: 2, paddingY: 5 }}>
            <List>
              <ListItem>
                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={2}
                  p={0}
                  width="100%"
                >
                  <ListItemText primary={<b>LOGGED IN AS:</b>} />
                  <Chip
                    color="primary"
                    label={isProxy ? "PROXY" : "MEMBER"}
                    size="small"
                  />
                </Stack>
              </ListItem>
              <Divider light sx={{ marginX: 2, marginBottom: 3 }} />
              <ListSubheader>AGM DETAILS</ListSubheader>
              <ListItem sx={{ paddingY: 0 }}>
                <ListItemText
                  primary={
                    <>
                      <b>COMPANY: </b>
                      {company}
                    </>
                  }
                />
              </ListItem>
              <ListItem sx={{ paddingY: 0 }}>
                <ListItemText
                  primary={
                    <>
                      <b>ATTENGING AGM:</b>
                      <Chip
                        color={attendingOpts.color}
                        label={attendingOpts.isAttending}
                        size="small"
                        sx={{ borderRadius: "5px", marginLeft: 3 }}
                      />
                    </>
                  }
                />
              </ListItem>
              <Divider light sx={{ marginX: 2, marginY: 2 }} />
              <ListSubheader>LIVE VIDEO DETAILS</ListSubheader>
              <ListItem sx={{ paddingY: 0 }}>
                <ListItemText
                  primary={
                    <>
                      <b>VIDEO STATUS:</b>
                      <Chip
                        color={liveOpts.color}
                        label={liveOpts.liveStatus}
                        size="small"
                        sx={{ borderRadius: "5px", marginLeft: 3 }}
                      />
                    </>
                  }
                />
              </ListItem>
              {videoLink ? (
                <ListItem sx={{ paddingY: 0 }}>
                  <ListItemText
                    primary={
                      <>
                        <b>LIVE VIDEO LINK:</b>
                        <FormGroup row sx={{ marginTop: 1 }}>
                          <TextField
                            InputProps={{
                              readOnly: true,
                            }}
                            defaultValue={`${videoLink}${userLiveToken}`}
                            size="small"
                          />
                          <Button
                            variant="contained"
                            disableElevation
                            onClick={() =>
                              window.open(`${videoLink}${userLiveToken}`)
                            }
                            sx={{
                              marginLeft: { xs: 0, sm: 1 },
                              marginTop: { xs: 1, sm: 0 },
                            }}
                          >
                            OPEN LINK
                          </Button>
                        </FormGroup>
                      </>
                    }
                  />
                </ListItem>
              ) : null}
              <Divider light sx={{ marginX: 2, marginTop: 2 }} />
              <ListSubheader>CREATED PROXY</ListSubheader>
              <ListItem sx={{ paddingY: 0 }}>{proxyDetails}</ListItem>
            </List>
          </Card>
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
