import './App.css';
import PropertyTokenForm from './Components/PropertyTokenForm';
import UserDirectory from './Components/UserDirectory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<PropertyTokenForm />} />
          <Route path="/admin/users" element={<UserDirectory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;