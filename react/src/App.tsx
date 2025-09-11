import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaTable, FaTextWidth, FaGripLines } from 'react-icons/fa';
import './App.css';
import { StatsProvider } from './context/StatsContext';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isClass = location.pathname === '/class'
  const isText = location.pathname === '/text'
  const isTable = location.pathname === '/table'

  return (
    <StatsProvider>
      {isHome && (
        <></>
      )}
      {isText && (
        <header className="navbar">
          <nav className="nav-links">
            <NavLink to="/" className="nav-item">
              <FaArrowLeft size={30} />
              <span>Voltar</span>
            </NavLink>
            <NavLink to="/text" className="nav-item">
              <FaTextWidth size={30} />
              <span>Texto</span>
            </NavLink>
            <NavLink to="/table" className="nav-item">
              <FaTable size={30} />
              <span>Tabela</span>
            </NavLink>
          </nav>
        </header>
      )}
      {isTable && (
        <header className="navbar">
          <nav className="nav-links">
            <NavLink to="/" className="nav-item">
              <FaArrowLeft size={30} />
              <span>Voltar</span>
            </NavLink>
            <NavLink to="/table" className="nav-item">
              <FaTable size={30} />
              <span>Tabela</span>
            </NavLink>
            <NavLink to="/text" className="nav-item">
              <FaTextWidth size={30} />
              <span>Texto</span>
            </NavLink>
          </nav>
        </header>
      )}
      {isClass && (
        <header className="navbar">
          <nav className="nav-links">
            <NavLink to="/" className="nav-item">
              <FaArrowLeft size={30} />
              <span>Voltar</span>
            </NavLink>
            <NavLink to="/class" className="nav-item">
              <FaGripLines size={30} />
              <span>Classe</span>
            </NavLink>
          </nav>
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </StatsProvider>
  );
}
