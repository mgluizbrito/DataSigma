import initParticles from './particles/particle-loader.ts';
import initOutputsGlobal from './outputsGlobals.ts';
import initTableOutput from './table-output.ts';
import initClasseOutput from './class-output.ts';
import { initCalculateByTable, initCalculateByText } from './CalculatorService/AgrupDiscreto.ts';
import initCalculateByClass from './CalculatorService/AgrupClasses.ts';

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

    case '/DataSigma/table/':
        initOutputsGlobal();
        initTableOutput();
        initCalculateByTable();
        break;

    case '/DataSigma/text/':
        initOutputsGlobal();
        initCalculateByText();
        break;

    case '/DataSigma/classe/':
        // initOutputsGlobal();
        initCalculateByClass();
        initClasseOutput();
        break;

    default:
      break;
  }
}

document.addEventListener('DOMContentLoaded', initialize);