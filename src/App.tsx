import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route,
  UNSAFE_DataRouterContext,
  UNSAFE_DataRouterStateContext
} from 'react-router-dom';
import { Layout } from '@components/layout/Layout';
import { PrivateRoute } from '@components/layout/PrivateRoute';
import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { Explore } from '@pages/Explore';
import { Profile } from '@pages/Profile';
import { TownSquare } from '@pages/TownSquare';
import { CreateNexus } from '@pages/CreateNexus';
import { ROUTES } from '@lib/constants';

// Enable v7 transitions
const router = {
  future: {
    v7_startTransition: true
  }
};

function App() {
  return (
    <BrowserRouter {...router}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.EXPLORE} element={<Explore />} />
          <Route path={ROUTES.PROFILE} element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path={ROUTES.TOWN_SQUARE} element={<TownSquare />} />
          <Route path={ROUTES.CREATE_NEXUS} element={<PrivateRoute><CreateNexus /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;