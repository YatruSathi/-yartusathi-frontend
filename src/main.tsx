import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider, } from "react-router";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import routes from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={theme}>
      <CssBaseline />
    <RouterProvider router={routes}/>
    </ThemeProvider>
  </StrictMode>,
)



