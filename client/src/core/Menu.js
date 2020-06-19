import React , {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticate} from '../auth/helper'
const currentTab = (history,path) =>{
    if(history.location.pathname===path){
        return {color : "#2ecc72"}
    }
    else{
        return {color : "#FFFFFF"}
    }
}

const Menu =({history}) => (
<div>
   <ul className="nav nav-tabs bg-dark">
       <li className="nav-item">
          <Link  style={currentTab(history, "/")} className="nav-link" to="/"> Home </Link>
       </li>
       { isAuthenticate() && isAuthenticate().user.role=== 0 && (
           
       <li className="nav-item">
          <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart"> Cart </Link>
       </li>
       )}
        { isAuthenticate() && isAuthenticate().user.role=== 0 && (
           
       <li className="nav-item">
       <Link  style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard"> Dashboard </Link>
    </li>
        )  }
        { isAuthenticate() && isAuthenticate().user.role=== 1 && (
       <li className="nav-item">
          <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard"> Admin Dashboard </Link>
       </li>
        ) }

       {!isAuthenticate() && 
         <Fragment>
         <li className="nav-item">
     <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup"> SignUp </Link>
  </li>
  
  <li className="nav-item">
     <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin"> SignIn</Link>
  </li>
  </Fragment>}
 
       {isAuthenticate() && (
         <li className="nav-item">
         <span className="nav-link text-warning" 
         onClick={() => {
            signout(()=> {
              history.push("/signin")
            })
         }}> signout  </span>
        </li>
       )}
      
    </ul>
</div>
)


export default withRouter(Menu);