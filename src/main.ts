import initParticles from './particles/particle-loader.ts';
import initOutputs from './outputs.ts';
import initTableOutput from './table-output.ts';
import initClasseOutput from './class-output.ts';

/**
 * Main Initialization File
 * Pega a rota da URL e carrega o script correspondente e inicializa os scripts corretamente.
 */
function initialize() {
  
  const path = window.location.pathname; // Pega o caminho da URL

  switch (path) {
    case '/DataSigma/':
        initParticles();
        break;

    case '/DataSigma/public/table/':
        initOutputs();
        initTableOutput();
        break;

    case '/DataSigma/public/text/':
        initOutputs();
        break;

    case '/DataSigma/public/classe/':
        initOutputs();
        initClasseOutput();
        break;

    default:
      break;
  }
}

document.addEventListener('DOMContentLoaded', initialize);