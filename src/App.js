import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Header from './containers/header'
import Footer from './containers/footer';
import Home from './containers/home'
import Profil from './containers/profil'
import Search from './containers/search'
import Detail from './containers/detail'
import Post from './containers/post'
import Voillier from './containers/voillier'
import Cruiser from './containers/cruiser';
import Jetski from './containers/jetski';
import Yatch from './containers/yatch';
import Peniche from './containers/peniche';
import Jetboat from './containers/jetboat';
import Accessoires from './containers/accessoires';
import Service from './containers/service';
import ImagesAnnonces from './containers/imagesAnnonces';
import Posteur from './containers/posteur';
import Annonce from './containers/annonces';
import Edityourads from './containers/edityourads'
import Admin from './containers/admin'


import {Routes, Route} from 'react-router-dom';
import RequireAuth from './helpers/require-data-auth'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<RequireAuth child={Home} auth={true}/>}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/login" element={<Login />}/>
          
          <Route exact path="/logout" element={<RequireAuth child={Logout} auth={true}/>}/>
          <Route exact path="/profil" element={<RequireAuth child={Profil} auth={true}/>}/>
          <Route exact path="/search" element={<RequireAuth child={Search} auth={true}/>}/>
          <Route exact path="/detail/:id" element={<RequireAuth child={Detail} auth={true}/>}/>
          <Route exact path="/post" element={<RequireAuth child={Post} auth={true}/>}/>
          <Route exact path="/voillier" element={<RequireAuth child={Voillier} auth={true}/>}/>
          <Route exact path="/cruiser" element={<RequireAuth child={Cruiser} auth={true}/>}/>
          <Route exact path="/jetski" element={<RequireAuth child={Jetski} auth={true}/>}/>
          <Route exact path="/yatch" element={<RequireAuth child={Yatch} auth={true}/>}/>
          <Route exact path="/peniche" element={<RequireAuth child={Peniche} auth={true}/>}/>
          <Route exact path="/jetboat" element={<RequireAuth child={Jetboat} auth={true}/>}/>
          <Route exact path="/accessoires" element={<RequireAuth child={Accessoires} auth={true}/>}/>
          <Route exact path="/service" element={<RequireAuth child={Service} auth={true}/>}/>
          <Route exact path="/imagesAnnonces/:id" element={<RequireAuth child={ImagesAnnonces} auth={true}/>}/>
          <Route exact path="/posteur/:id" element={<RequireAuth child={Posteur} auth={true}/>}/>
          <Route exact path="/annonces" element={<RequireAuth child={Annonce} auth={true}/>}/>
          <Route exact path="/edityourads/:id" element={<RequireAuth child={Edityourads} auth={true}/>}/>
          <Route exact path="/admin" element={<RequireAuth child={Admin} auth={true}/>}/>
          
        
        </Routes>
      </main>
      <Footer />

    </div>
  )
}

export default App;
