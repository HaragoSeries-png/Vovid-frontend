
import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'


//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//components
import { LoadingRender } from './components/LoadingRender';
import Page1 from './components/Page1';


//pages
const HomePage = React.lazy(()=>import('./pages/HomePage'))
const DashBoard = React.lazy(()=>import('./pages/DashBoard'))
const TestAPI   = React.lazy(()=>import('./pages/TestAPI'))
const ReactQuery   = React.lazy(()=>import('./pages/Reactquery'))
const MainPage    = React.lazy(()=>import('./pages/MainPage'))
function App() {
  return (
    <BrowserRouter>
      {/* <React.Suspense fallback={<LoadingRender/>}>
      <Routes>
        
        <Route index element={<HomePage/>}/>
        <Route path='admin'>
          <Route path="dashboard" element={<DashBoard/>}></Route>  
        </Route>
        <Route path="testapi" element={<TestAPI/>}></Route>
        <Route path="query" element={<ReactQuery/>}></Route>
        <Route path="mainPage" element={<MainPage/>}></Route>
      </Routes>
        </React.Suspense> */}
  <Page1/>

    </BrowserRouter>
  );
}

export default App;
