import {
  Container,
  Card,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { Context } from "..";
import { login, signup } from "../requests/authRequests";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    setError(null);
    try {
      let data;
      if (isLoginPage) {
        data = await login(email, password);
      } else {
        data = await signup(name, email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      setTimeout(() => navigate("/"), 1000);
    } catch (e) {
      if (e.response.status === 401) {
        setError("Invalid email/password");
        return;
      }
      setError("Something went wrong");
    }
  };

  return (
    <Container sx={{ marginTop: "64px" }}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: "10%",
        }}
      >
        <Card
          sx={{
            width: "50%",
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" style={{ marginBottom: "5%" }}>
            Welcome to the app
          </Typography>
          {!isLoginPage && (
            <TextField
              style={{ width: "80%" }}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            style={{ width: "80%", marginTop: "2%" }}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ width: "80%", marginTop: "2%" }}
            label="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "3%",
            }}
          >
            {isLoginPage ? (
              <Box>
                <Typography variant="body1">
                  No account? <NavLink to={"/signup"}>Sign up</NavLink>
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="body1">
                  Have an account? <NavLink to={"/login"}>Log in</NavLink>
                </Typography>
              </Box>
            )}
            <Button variant="contained" onClick={handleAuth}>
              {isLoginPage ? "Log In" : "Sign Up"}
            </Button>
          </Box>
          <Box sx={{ marginTop: "1%" }}>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </Box>
        </Card>
      </Box>
    </Container>
  );
});

export default Auth;
