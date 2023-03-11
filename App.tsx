import React, { FC } from 'react';
import { Home } from './componnents/HomeScreen';
import NavigationIndex  from './componnents/Index';
import { AuthProvider } from './context/AuthContext';

//Android: 298476555151-h708gdfjp9uuetismrlopau1ulh7jcf7.apps.googleusercontent.com 
//298476555151-frdnkdur7hbu85cp8s5c4t5ekhd84pq5.apps.googleusercontent.com
const App: FC = () => {

  return (
      <AuthProvider >
        <NavigationIndex/>
      </AuthProvider>
  );
}

export default App