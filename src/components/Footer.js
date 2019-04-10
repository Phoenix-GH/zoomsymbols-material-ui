import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <footer>
      <AppBar position="sticky">
        <Toolbar>
          <Typography align="center" variant="caption" color="inherit">
            ZoomSymbols &copy;
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  )
}

export default Footer