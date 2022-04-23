import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';
import './navbar.css'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center text-center">
        {/* <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">I Choose You!!</h1>
          </Link>
          <p className="m-0">Get into the mind of making your own team to battle with.</p>
        </div> */}

        <div className="dropdown text-center">
          <img className="bg-transparent border-0 pokeLogo btn btn-secondary dropdown-toggle"           
            type="button" 
            id="dropdownMenuButton1" 
            data-bs-toggle="dropdown" 
            aria-expanded="false" 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png">
          </img>
          <ul className="dropdown-menu nav-drop text-center" aria-labelledby="dropdownMenuButton1">
            <li>
                    <Link className="btn btn-lg btn-info m-2" to="/">
                      Home
                    </Link>
            </li>
                {Auth.loggedIn() ? (
                  <>
                    <li>
                      <Link className="btn btn-lg btn-info m-2" to="/">
                        {Auth.getProfile().data.username}'s teams
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-lg btn-info m-2" to="/login">
                      Login
                    </Link>
                    <Link className="btn btn-lg btn-light m-2" to="/signup">
                      Signup
                    </Link>
                  </>
                )}
            <li>
            {Auth.loggedIn() ? (
                  <li>
                    <button className="btn btn-lg btn-light m-2" onClick={logout}>
                        Logout
                      </button>
                  </li>
                ) : (
                  <>
                  </>
                )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
