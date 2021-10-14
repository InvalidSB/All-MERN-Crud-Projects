import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'


import Home from './components/Home'
import CreateNewPost from './components/CreateNewPost'
import PostDetails from './components/PostDetails'
import EditPost from './components/EditPost'
import Navbar from './components/Navbar'


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container-fluid">
      <Route exact path="/" component={Home}/>
      <Route exact path="/posts/add" component={CreateNewPost}/>
      <Route exact path="/posts/details/:id" component={PostDetails}/>
      <Route exact path="/posts/edit/:id" component={EditPost}/>
    </div>
    </BrowserRouter>
  )
}

export default App
