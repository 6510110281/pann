import { Route, Routes,} from 'react-router-dom';

import Login from '../pages/login';
import UserResultList from "../pages/user-result-list"

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login/>} />
      <Route path="home" element={<UserResultList/>} />
    </Routes>
  );
};

export default AppRoutes