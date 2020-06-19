import React from 'react';
import Base from '../core/Base';
import {isAuthenticate} from '../auth/helper/index';
import {Link } from 'react-router-dom'



const AdminDashboard = () => {

const {user : {name , email , role}} = isAuthenticate();

   const adminleftside = () => (
      <div className="card">
         <h4 className="card-header bg-dark text-white">
         Admin Navigation
         </h4>
         <ul className="list-group">
         
         <li className="list-group-item">
         <Link to="/admin/create/category" className="nav-link text-info">  Create Category</Link>
         </li>

         <li className="list-group-item">
         <Link to="/admin/categories" className="nav-link text-info">  Manage Category</Link>
         </li>

         <li className="list-group-item">
         <Link to="/admin/create/product" className="nav-link text-info">  Create Product</Link>
         </li>
         
         <li className="list-group-item">
         <Link to="/admin/products" className="nav-link text-info">  Manage Products</Link>
         </li>

         <li className="list-group-item">
         <Link to="/admin/orders" className="nav-link text-info">  Manage Orders</Link>
         </li>

         </ul>
      </div>   
   )  
   

   const adminrightside = () => {
     return (
         <div className="card mb-4">
         <h4 className="card-header"> Admin Information  </h4>
          <ul className="list-group">
          <li className="list-group-item">
          <span className="badge badge-success mr-2">
          Name : 
          </span> {name}
          
          </li>
            <li className="list-group-item">
             <span className="badge badge-success mr-2">
             Email: 
             </span> {email}
          </li>
   
          <li className="list-group-item">
             <span className="badge badge-danger"> Admin Area </span>
          </li>
             </ul>


         </div>
     )

   }


    return (
         <Base title="Welcome to the Admin Area" description="Manage all of your products here" className="container bg-success p-4">
            <div className="row">
              <div className="col-sm-3">
              {adminleftside()}
              </div>
              <div className="col-sm-9">
              {adminrightside()}
              </div>
            </div>
        
         

         </Base>
        )
}

export default AdminDashboard;