import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// App theme
import {theme} from './common/theme';

// Components 
import {SignIn} from './components/signin';
import {SignUp} from './components/signup';
import {Product} from './components/product';
import {CreateProduct} from './components/create_product';
import {Home} from './components/home';

// Services 
import {onAuthStateChange} from './service/firebase';

// contexts
import {AuthContext} from  './index';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sub = onAuthStateChange(setUser);
    return () => {
      sub();
    };
  }, []);

  const getRoutes = () => {
    if (user !== null){
      return (
        <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Home />}/>
              <Route path="/product" element={<Product />}/>
              <Route path="/product/create" element={<CreateProduct />}/>
              <Route exact path="/" element={<Navigate to="/home" replace />}/>
              <Route path="*" element={<Home />}/> 
            </Routes>
          </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route exact path="/" element={<Navigate to="/signin" replace />}/>
            <Route path="*" element={<SignIn />}/> 
          </Routes>
        </BrowserRouter>
      );
    }

  };


  return (
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ user, setUser}}>
          <div className="App">
            {getRoutes()}
          </div>
        </AuthContext.Provider>
      </ThemeProvider>
  );
}

export default App;
