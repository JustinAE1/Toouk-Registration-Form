import './App.css';
import LoginRegistrationPage from './Components/LoginRegistrationPage';
import PropertyTokenForm from './Components/PropertyTokenForm';
import UserDirectory from './Components/UserDirectory';
import UserProfileDashboard from './Components/UserProfileDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersTablePage from './Components/UsersTablePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistrationPage />} />
          {/* <Route path="/" element={<PropertyTokenForm />} /> */}
          <Route path="/user" element={<UserProfileDashboard />} />
          {/* <Route path="/admin/users" element={<useGetUsers />} /> */}
          <Route path="/admin/users" element={<UsersTablePage />} />
          {/* <Route path="/admin/users" element={<UserDirectory />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;