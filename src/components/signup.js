import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import {AuthContext} from '../index';
import {createStoreProfile} from '../service/firebase';

import {StoreServicePromiseClient} from '../generated/pb/postseam/example/v1/store_service_grpc_web_pb';
import {CreateStoreRequest} from '../generated/pb/postseam/example/v1/store_service_pb';

export function SignUp() {

  const Auth = React.useContext(AuthContext);
  const storeClient = new StoreServicePromiseClient(process.env.REACT_APP_POSTSEAM_SERVER_URL);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = data.get('email');
    const storeName = data.get('storeName');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (!passwordValid(password, confirmPassword)){
        return;
    }

    const user = await createStoreProfile(email, password);
    if (typeof user === "string"){
        console.log(user);
        return ;
    }
    Auth.setFirebaseUser(user);

    try{

        // Validating that we can create a new user in the DB.
        const req = new CreateStoreRequest()
            .setId(user.uid)
            .setEmail(email)
            .setBusinessName(storeName);
        await storeClient.createStore(req, {"authorization": user.accessToken});
        
        Auth.setUser(user);

        window.location.href = '/home';
    } catch (err){
        console.log(err);
        return ;
    }
  };

  const passwordValid = (password, confirmPassword) => {
      if (password === confirmPassword){
          return true;
      }
      
      console.log("Passwords don't match.");
      return false;
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="storeName"
              label="Store Name"
              name="storeName"
              autoComplete="storeName"
              autoFocus
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="businessName"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
