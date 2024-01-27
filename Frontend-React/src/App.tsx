import { ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import { blueGrey, grey } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';
import ParentNavigation from './components/nav/ParentNavigation';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: { default: grey[400], paper: grey[600] },
      primary: grey,
      secondary: blueGrey,
      text: {
        primary: grey[50],
        secondary: grey[200],
      },
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className='bg-slate-900 h-screen overflow-hidden'>
        <BrowserRouter>
          <div className='flex flex-row h-full'>
            <ParentNavigation />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
