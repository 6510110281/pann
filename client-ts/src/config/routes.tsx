import { useEffect } from "react"
import { Route, Routes, useLocation, Navigate} from 'react-router-dom';
import { useAppCtx } from "../AppProvider"

import Login from '../pages/login';
import UserResultList from "../pages/user-result-list"
import AnnouncementList from "../pages/announcement-list"

type Props = {
  staffOnly?: boolean
  children: JSX.Element
}

const ProtectedRoute = ({staffOnly, children}: Props) => {
  const {userInfo, action} = useAppCtx()
  const location = useLocation()
  const redirectToLogin = () => {
    action.signOut()
    console.log('backTo = ', location.pathname)
    return <Navigate to="/login" replace state={{backTo: location.pathname}}/>
  }

  const reFresh = () => {
    console.log('backTo = ', location.pathname)
    return <Navigate to="/home" replace state={{backTo: location.pathname}}/>
  }

  useEffect(() => {
    const json = sessionStorage.getItem('userInfo') as string
    const data = JSON.parse(json)
    if (!userInfo.ready || (staffOnly && !action.isStaff())) {
      if(data.ready){
        if(staffOnly && !data.staff){
          redirectToLogin()
        }else{
          reFresh()
        }
      }else{
        redirectToLogin()
      }          
    }
  }, [userInfo.ready, staffOnly])

  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login/>} />
      <Route path="home" element={<ProtectedRoute><UserResultList/></ProtectedRoute>} />
      <Route path='announcement' element={<ProtectedRoute staffOnly={true}><AnnouncementList/></ProtectedRoute>}/>
    </Routes>
  );
};

export default AppRoutes