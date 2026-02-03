import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ user, onLogout }){
  const nav = useNavigate();
  return (
    <header className="site-header">
      <div className="header-left">
        <div className="brand">MEDIBOT</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/appointments">Book</Link>
          <Link to="/chatbot">Chatbot</Link>
          <Link to="/teleconsult/local">Consult</Link>
        </nav>
      </div>
      <div>
        {user ? (
          <>
            <span style={{marginRight:12}}>Hello, {user.name}</span>
            <button className="button small" onClick={()=>{ onLogout(); nav('/') }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{color:'white', textDecoration:'underline'}}>Login</Link>
          </>
        )}
      </div>
    </header>
  );
}
