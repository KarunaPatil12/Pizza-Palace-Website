import { jwtDecode } from 'jwt-decode';
import './App.css';
import { LoginScreen } from './screenComponents/LoginScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from './redux/selectors/authSelector';
import { logoutStart } from './redux/authAction';
import UserScreen from './screenComponents/UserScreen/UserScreen';
import AdminScreen from './screenComponents/AdminScreen/AdminScreen';
import { UserHomeScreen } from './screenComponents/UserScreen/UserHomeComponent';
import { RegisterationScreen } from './screenComponents/LoginScreen/RegistrationScreen';
import { UserProfile } from './screenComponents/UserScreen/ProfileComponent';
import { AdminlayoutScreen } from './screenComponents/AdminScreen/AdminLayout.js';
import LayoutComponent from './screenComponents/UserScreen/LayoutComponent/LayoutComponent';
import UserDataScreen from './screenComponents/AdminScreen/UserDataComponent/UserDataScreen.js';
import AdminProfile from './screenComponents/AdminScreen/AdminProfileComponent/AdminProfile.js';
import AdminHome from './screenComponents/AdminScreen/AdminHomeComponent/AdminHome.js';


function App() {
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();

  const token = auth?.tokenData;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime && auth?.loggedIn) {
        dispatch(logoutStart());
      }
    } else if (auth?.loggedIn) {
      dispatch(logoutStart());
    }
  }, [token, auth, dispatch]);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path={'/'} element={<LoginScreen />} />
        <Route path={'/register'} element={<RegisterationScreen />} />

        {/* User Screen Route */}
        <Route path='/layout' element={<LayoutComponent />}>
          <Route path={'userscreen'} element={<UserScreen />} />
          <Route path={'userhome'} element={<UserHomeScreen />} />
          <Route path={'profile'} element={<UserProfile />} />
        </Route>

        {/* Admin Route */}
        <Route path='/admin' element={<AdminlayoutScreen />}>
          <Route path={'adminscreen'} element={<AdminScreen />} />
          <Route path={'userdata'} element={<UserDataScreen />} />
          <Route path={'adminprofile'} element={<AdminProfile />} />
          <Route path={'adminhome'} element={<AdminHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
