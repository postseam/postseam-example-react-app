import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import {Header} from './header';
import {AuthContext} from '../index';

import {Product as PostseamProduct} from '../generated/pb/postseam/example/v1/product_pb';
import {ProductServicePromiseClient} from '../generated/pb/postseam/example/v1/product_service_grpc_web_pb';
import {ListProductsRequest, ListProductsResponse} from '../generated/pb/postseam/example/v1/product_service_pb';

export function Product() {
    const productClient = new ProductServicePromiseClient(process.env.REACT_APP_POSTSEAM_SERVER_URL);

    const Auth = React.useContext(AuthContext);

    const [products, setProducts] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [totalCount, setTotalCount] = React.useState(-1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // pagination info
    const [nextPageToken, setNextPageToken] = React.useState(null);

    React.useEffect(() => {
      }, [Auth]);

    React.useEffect(() => {
      getProducts();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const getProducts = async () => {
      let newProducts = null;
      let newToken = null;
      if(products === null){
        const req = new ListProductsRequest()
          .setStoreId(Auth.postseamUser)
          .setPageSize(rowsPerPage);

        const res = await productClient.listProducts(req);
        newProducts = res.getProductsList();
        newToken = res.getNextPageToken();

      } else {
        const productNeeded = (page + 1)*rowsPerPage - products.length;
        if (productNeeded > 0 && (nextPageToken !== null && nextPageToken.length > 0)) {
          const req = new ListProductsRequest()
          .setStoreId(Auth.postseamUser)
          .setPageSize(rowsPerPage)
          .setPageToken(nextPageToken);

          const res = await productClient.listProducts(req);
          newProducts = res.getProductsList();
          newToken = res.getNextPageToken();
        }
      }

      if (newProducts !== null && newProducts.length > 0){

        const newProductList = [...getProductRows(), ...newProducts]
        setProducts(newProductList);

        if (newToken !== null && newToken.length > 0){
          setNextPageToken(newToken);
        } else{
          setNextPageToken(null);
          setTotalCount(newProductList.length)
        }
      }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        // TODO: Support searches in the products page.
        const search = data.get('search');
        console.log(search);
    };

    const getProductRows = () => {
      return products || [];
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
              padding: '1%',
              marginBottom: '5px',
            }}
          >

            <Toolbar />
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              style={{float: 'right', marginBottom: '1%'}}
              onClick={(e) => {
                e.preventDefault();
                window.location.href='/product/create';
                }}>
              New Product
            </Button>
            <TableContainer component={Paper}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Toolbar sx={{ pt: '10px'}}>
                    <TextField
                            sx={{ width: '50vw', borderWidth: '3px'}}
                            id="search"
                            label="Search Products"
                            name="search"
                            autoComplete="search"
                            autoFocus
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon></SearchIcon>
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                  </Toolbar>
                  <Table sx={{ minWidth: 650}} aria-label="simple table">
                      <TableHead>
                      <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell align="right">Product Description</TableCell>
                          <TableCell align="right">Time Created</TableCell>
                          <TableCell align="right">Last Update Time</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      {getProductRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(p => p.toObject()).map((row) => (
                          <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell component="th" scope="row">
                              {row.productName}
                          </TableCell>
                          <TableCell align="right">{row.productDescription}</TableCell>
                          <TableCell align="right">{row.createTime}</TableCell>
                          <TableCell align="right">{row.updateTime}</TableCell>
                          </TableRow>
                      ))}
                      </TableBody>
                  </Table>
                </Box>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>
        </Box>
    );
  }
