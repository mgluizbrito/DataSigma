import logo from "../assets/logo-gray.svg"
import tableIcon from "../assets/table_24dp_FFFFFF.svg"
import editNoteIcon from "../assets/edit_note_24dp_FFFFFF.svg"
import fitWidthIcon from "../assets/fit_width_24dp_FFFFFF.svg"

import classes from "./Home.module.css"

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={classes.home}>
      <header className={classes.header}>
        <div className={`${classes.headerTitle} flex justify-center align-center flex-column`}>
          <img src={logo} alt="Logo do DataSigma" />

          <h1>DataSigma</h1>
          
          <p>Simplificando a Estatística... Escolha como deseja entrar com os dados:</p>
        </div>

        <div className={classes.inputOptions}>
          <div className={classes.agrDiscOptions}>
            <Link to="/table" className={`table-input ${classes.inputOp}`}>
              <div className={classes.icon}>
                <img className={classes.img} src={tableIcon} alt="table icon" />
              </div>
              <span>Entrar dados com tabela</span>  
            </Link>

            <Link to="/text" className={`table-input ${classes.inputOp}`}>
              <div className={classes.icon}>
                <img src={editNoteIcon} alt="edit node icon" />
              </div>
              <span>Entrar dados com texto</span>
            </Link>

            <span className={classes.title}>Agrupamento Discreto</span>
          </div>

          <div className={classes.agrClassOptions}>
            <Link to="/class" className={`table-input ${classes.inputOp}`}>
              <div className={classes.icon}>
                <img src={fitWidthIcon} alt="fit width icon" />
              </div>
              <span>Entrar dados com classes</span>
            </Link>

            <div className={classes.title}>Agrupamento em Classes</div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
