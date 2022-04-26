
import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { Navbar } from './components/Navbar'; 
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import ClusterPage from './pages/ClusterPage';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingPage from './components/Loading';
//components


//pages
// const HomePage = React.lazy(()=>import('./pages/HomePage'))
// const DashBoard = React.lazy(()=>import('./pages/DashBoard'))
// const TestAPI   = React.lazy(()=>import('./pages/TestAPI'))
// const ReactQuery   = React.lazy(()=>import('./pages/Reactquery'))
// const MainPage    = React.lazy(()=>import('./pages/MainPage'))
function App() {



  
  return (
<div className='head'>
        <BrowserRouter>
        <Navbar/>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route exact path="/" element={<MainPage/>}></Route>
            <Route exact path="/Cluster" element={<ClusterPage/>}></Route>
          </Routes>
        </Suspense>
       </BrowserRouter>

</div>
  );
}

export default App;
