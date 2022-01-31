
import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { Navbar } from './components/Navbar'; 
import DashBoard from './pages/DashBoard';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import TestPage from './pages/testPage';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import { LoadingRender } from './components/LoadingRender';
import Page1 from './components/Page1';


//pages
// const HomePage = React.lazy(()=>import('./pages/HomePage'))
// const DashBoard = React.lazy(()=>import('./pages/DashBoard'))
// const TestAPI   = React.lazy(()=>import('./pages/TestAPI'))
// const ReactQuery   = React.lazy(()=>import('./pages/Reactquery'))
// const MainPage    = React.lazy(()=>import('./pages/MainPage'))
function App() {
  return (
<div className='head'>
    <Navbar/>
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<MainPage/>}></Route>
            <Route exact path="/test" element={<TestPage/>}></Route>
          </Routes>
       </BrowserRouter>
    </div>
</div>
  );
}

export default App;
