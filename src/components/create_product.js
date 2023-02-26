import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {Header} from './header';
import {AuthContext} from '../index';

import {Product as PostseamProduct} from '../generated/pb/postseam/example/v1/product_pb';
import {ProductServicePromiseClient} from '../generated/pb/postseam/example/v1/product_service_grpc_web_pb';
import {CreateProductRequest} from '../generated/pb/postseam/example/v1/product_service_pb';
import { FormControl } from '@mui/material';

export function CreateProduct() {
    const Auth = React.useContext(AuthContext);
    const productClient = new ProductServicePromiseClient(process.env.REACT_APP_POSTSEAM_SERVER_URL);


    React.useEffect(() => {
      }, [Auth]);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const productName = data.get('productName');
        const productDescription = data.get('productDescription');

        const s = JSON.stringify(Auth.postseamUser);
        console.log(s);
        console.log(productDescription);

        // TODO get images for upload
    
        try{
            const req = new CreateProductRequest()
                .setStoreId(Auth.postseamUser)
                .setProductName(productName)
                .setProductDescription(productDescription);

            const product = await productClient.createProduct(req);
            window.location.href = '/product';
        } catch (err){
            console.log(err);
            return ;
        }
      };

    
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
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              <Toolbar />
            
            <Box 
                component='form' 
                onSubmit={handleSubmit}
                sx={{
                    width: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
            <Grid container sx={{width: '90%', pb: 4,  flexDirection: 'row',}}>
                <Grid item xs={10}>
                    <Typography component="h2" variant="h5">
                        Add Product
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button 
                        variant="contained" 
                        style={{float: 'right', marginBottom: '1%'}}
                        type="submit"
                        >
                       Save
                    </Button>
                    </Grid>
                </Grid>
            <Box 
                noValidate 
                sx={{width: '90%', pb: 4}}>
                    <Paper sx={{p: 3}}>
                <Typography> Name</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="productName"
                    name="productName"
                    autoComplete="productName"
                    autoFocus
                />
                <Typography>Description</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="productDescription"
                    name="productDescription"
                    autoComplete="productDescription"
                    multiline
                    rows={4}
                />
                </Paper>
            </Box>
            <Box 
                noValidate 
                sx={{width: '90%', pb: 4}}>
                <Paper sx={{p: 3}} >
                <Typography component="h2" variant="h5"> Images</Typography>
                <Typography> Add images of your product to show customers.</Typography>
                <br></br>
                <Button 
                    variant="outlined" 
                    fullWidth sx={{
                        height: '15vh', 
                        padding: '20px', 
                        borderStyle: 'dashed'
                    }}>Click to upload images.</Button>
                </Paper>
            </Box>
            </Box>
          </Box>
        </Box>
    );
  }
