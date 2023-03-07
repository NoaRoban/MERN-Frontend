import React, { FC } from 'react';
import { Home } from './componnents/HomeScreen';
import NavigationIndex  from './componnents/Index';
import { AuthProvider } from './context/AuthContext';


const App: FC = () => {

  return (
      <AuthProvider >
        <NavigationIndex/>
      </AuthProvider>
  );
}

export default App