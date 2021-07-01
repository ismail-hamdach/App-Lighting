import React from 'react';
import { AuthProvider } from '../providers/AuthProvider'
import Rootes from './Rootes'

const index = () => {
  
  return (
    <AuthProvider>
        <Rootes/>
    </AuthProvider>
  );

}

export default index;