import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import ScannedDocumentList from './components/ScannedDocumentList';
import ScannedDocumentForm from './components/ScannedDocumentForm';
import ScannedDocumentDetails from './components/ScannedDocumentDetails';
import Update from './components/Update';

function App() {
  return (
    <div className="App">   
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/form' element={<ScannedDocumentForm/>}></Route>
          <Route path='/' element={<ScannedDocumentList/>}></Route>
          <Route path='/details/:id' element={<ScannedDocumentDetails/>}></Route>
          <Route path='/update/:id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
