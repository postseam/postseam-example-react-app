import * as React from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import {AuthContext} from '../index';
import {loginStoreProfile} from '../service/firebase';

import {StoreServicePromiseClient} from '../generated/pb/postseam/example/v1/store_service_grpc_web_pb';
import {GetStoreRequest} from '../generated/pb/postseam/example/v1/store_service_pb';

export function SignIn() {

  // Global Auth state
  const Auth = React.useContext(AuthContext);

  // Local state
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const storeClient = new StoreServicePromiseClient(process.env.REACT_APP_POSTSEAM_SERVER_URL);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoading(true);

    // Form fields
    const email = data.get('email');;
    const password = data.get('password');

    const user = await loginStoreProfile(email, password);
    if (typeof user === "string"){
        setError(user);
        setLoading(false);
        return ;
    }

    try{
        // Validating the user exists in our DB.
        const req = new GetStoreRequest().setStoreId(user.uid);
        await storeClient.getStore(req, {"authorization": user.accessToken});

        Auth.setUser(user);

        window.location.href = '/home';
    } catch (err){
        console.error(err);
        setError('Something went wrong, Please try again later.');
        setLoading(false);
        return ;
    }
    setLoading(false);
  };

  return (
      <Container component="main">
        <CssBaseline />
        {error !== null && <Alert severity="error" onClose={() => {}}> {error} </Alert>}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="businessName"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ?
                  (<CircularProgress color="inherit" />): ("Sign In")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                window.location.href='/signup';
                }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
