
import './App.css';
import Navbar from './Components/Navbar';
import ConnectionCmp from './Components/ConnectionCmp';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
 <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectionCmp></ConnectionCmp>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
