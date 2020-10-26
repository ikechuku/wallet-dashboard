import React from 'react';
import { Grid } from '@material-ui/core';
import { LogoBg, Form } from './styles';
import { Logo } from '../../molecule';

const Onboarding = ({ children: Component, className }) => (
  <>
    <div className={`${className}`}>
      <Grid container justify="center" alignItems="center" className="bg">
        <Logo theme="dark" imageSize="15rem" className="logo" />
      </Grid>
    </div>
    <Form>{Component}</Form>
  </>
);

export default LogoBg(Onboarding);
