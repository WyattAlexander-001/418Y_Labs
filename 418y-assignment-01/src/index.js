import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useNavigate } from 'react-router-dom'; //lab 4
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Users from './Users';
import CreateProject from './CreateProject' //lab 3
import CreateTeam from './CreateTeam';
import ViewProject from './ViewProject';
import ViewTeam from './ViewTeam';
import Home from './Home'; //lab 4
import CreateTeamRoster from './CreateTeamRoster'; //lab 4


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path = "/" element = {<Home/>}/>
    <Route path = "/Home" element = {<Home/>}/>
    <Route path = "/Users" element = {<Users/>}/>

    <Route path = "/Login" element = {<Login/>}/>
    <Route path = "/Signup" element = {<Signup/>}/>

    <Route path = "/CreateProject" element = {<CreateProject/>}/>
    <Route path = "/CreateTeam" element = {<CreateTeam/>}/>
    <Route path = "/ViewProject" element = {<ViewProject/>}/>
    <Route path = "/ViewTeam" element = {<ViewTeam/>}/>

    <Route path = "/CreateTeamRoster" element = {<CreateTeamRoster/>}/>
    </>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}>
    <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();