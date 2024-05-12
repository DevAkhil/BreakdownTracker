import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import breakdownstore from './Redux/Store';
import { ToastContainer } from 'react-toastify';
import BreakdownPage from './Page/BreakdownPage';
import Breakdown from './Component/Breakdown/Breakdown';
import ResponsiveAppBar from './Component/Navbar/ResponsiveNavbar';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#ececec"
    },
    primary: {
      main: '#171725',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#48b58d',
      // dark: will be calculated from palette.secondary.main,
      contrastText: 'white',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <Provider store={breakdownstore}>
    <ResponsiveAppBar/>
    <BrowserRouter>

        <Routes>
          <Route path='/' element={<Breakdown></Breakdown>}></Route>
          <Route path='/breakdown' element={<Breakdown></Breakdown>}></Route>
        </Routes>

    </BrowserRouter>
    <ToastContainer position='top-right'></ToastContainer>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
