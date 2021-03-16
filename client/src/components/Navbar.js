import React from 'react';

const Navbar = ({account}) => {
  return ( 
    <nav className="navbar navbar-light bg-light justify-content-between">
          <a className="navbar-brand" href="body">Navbar</a>
          <div>{account}</div>
        </nav>
   );
}
 
export default Navbar;