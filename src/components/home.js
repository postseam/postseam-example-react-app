import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import {Header} from './header';
import {AuthContext} from '../index';


export function Home() {
    const Auth = React.useContext(AuthContext);

    React.useEffect(() => {
    }, [Auth]);
  
    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          < Header />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            </Container>
          </Box>
        </Box>
    );
  }