import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// App theme
import {theme} from './common/theme';

// Components 
import {SignIn} from './components/signin';
import {SignUp} from './components/signup';

import {Home} from './components/home';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/home" element={<Home />}/>
        <Route exact path="/" element={<Navigate to="/signin" replace />}/> 
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
