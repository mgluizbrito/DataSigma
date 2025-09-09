import React, { useContext, useEffect, useRef } from "react"
import { StatsContext } from "../context/StatsContext";
import * as CalcFunc from "../utils/calculate"
import "./Section.css"
import classes from "./Class.module.css"
import { BsPlusCircleFill, BsListCheck, BsTrash } from "react-icons/bs";
import { FaGripLines } from "react-icons/fa";
import { FrequencyChart } from "../components/FrequencyChart";
import { CumulativeFrequencyChart } from "../components/CumulativeFrequencyChart";
import { Results } from "../components/Results";

const ClassPage: React.FC = () => {
  const {
    classData,
    setClassData,
    unitMeasure,
    setUnitMeasure,
    results,
    setResults,
    selectedMeasures,
    setSelectedMeasures
  } = useContext(StatsContext)

  const liRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fiRefs = useRef<(HTMLInputElement | null)[]>([]); 

  const processData = () => {
    const filteredClassData = classData.filter(row => row.li !== 0 || row.ls !== 0 || row.fi !== 0);
    filteredClassData.sort((a, b) => a.ls - b.ls);

    const Li = filteredClassData.map(row => row.li);
    const Ls = filteredClassData.map(row => row.ls);
    const Fi = filteredClassData.map(row => row.fi);

    const Pmi = CalcFunc.calcPontoMedio(Li, Ls);

    const Fa: number[] = [];
    let cumulativeFrequency = 0;
    Fi.forEach(f => {
      cumulativeFrequency += f;
      Fa.push(cumulativeFrequency);
    });

    return { Li, Ls, Fi, Pmi, Fa };
  };

  useEffect(() => {
    const { Li, Ls, Fi, Pmi } = processData();

    if (Li.length === 0 || Ls.length === 0) {
      setResults([]);
      return;
    }

    const amplitudes = CalcFunc.calcAmplitudeClasse(Li, Ls)

    const newResults: { label: string; value: string | number }[] = [];
    selectedMeasures.forEach(measure => {
      switch (measure) {
        case "Moda Bruta":
          const modaBruta = CalcFunc.calcModa(Pmi, Fi) as number[];
          newResults.push({
            label: "Moda Bruta",
            value: `${CalcFunc.getModaType(modaBruta)}: (${modaBruta.join(", ")}) ${unitMeasure}`,
          });
          break;
        case "Moda de Czuber":
          const modaCzuber = CalcFunc.calcModaCzuber(Li, Fi, amplitudes) as number[];
          newResults.push({
            label: "Moda de Czuber",
            value: `${CalcFunc.getModaType(modaCzuber)}: (${modaCzuber.join(", ")}) ${unitMeasure}`,
          });
          break;
        case "Média":
          newResults.push({ label: "Média", value: `${CalcFunc.calcMedia(Pmi, Fi)} ${unitMeasure}` });
          break;
        case "Mediana":
          newResults.push({ label: "Mediana", value: `${CalcFunc.calcMedianaClasses(Li, Ls, Fi)} ${unitMeasure}` });
          break;
        case "Variância":
          newResults.push({ label: "Variância", value: `${CalcFunc.calcVariancia(Pmi, Fi)} ${unitMeasure}` });
          break;
        case "Desvio Padrão":
          newResults.push({
            label: "Desvio Padrão",
            value: `${CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(Pmi, Fi))} ${unitMeasure}`,
          });
          break;
        case "Coeficiênte de Variação":
          newResults.push({
            label: "Coeficiente de Variação",
            value: `${CalcFunc.calcCoeficienteVariacao(
              CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(Pmi, Fi)),
              CalcFunc.calcMedia(Pmi, Fi)
            )}%`,
          });
          break;
      }
    });

    setResults(newResults);
  }, [classData, selectedMeasures, unitMeasure, setResults])

  useEffect(() => {
    const lastRowIndex = classData.length - 1;
    if (fiRefs.current[lastRowIndex]) {
      fiRefs.current[lastRowIndex]?.focus();
    }
  }, [classData.length]);


  const handleClassChange = (index: number, field: "li" | "ls" | "fi", value: string) => {
    const updated = [...classData]
    updated[index][field] = Number(value)
    setClassData(updated)
  }

  const handleRemoveRow = (index: number) => {
    const updated = classData.filter((_, i) => i !== index)
    setClassData(updated)
  }

  const handleAddRow = () => {
    if (classData.length > 0) {
      const lastRow = classData[classData.length - 1];
      const amplitude = lastRow.ls - lastRow.li;
      const newLi = lastRow.ls;
      const newLs = lastRow.ls + amplitude;
      setClassData([...classData, { li: newLi, ls: newLs, fi: 0 }]);
    } else {
      setClassData([...classData, { li: 0, ls: 0, fi: 0 }]);
    }
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRow();
    }
  };

  const handleCheckboxChange = (measure: string) => {
    if (selectedMeasures.includes(measure)) {
      setSelectedMeasures(selectedMeasures.filter(m => m !== measure));
    } else {
      setSelectedMeasures([...selectedMeasures, measure]);
    }
  }

  const { Li, Ls, Fi, Pmi, Fa } = processData();

  return (
    <div className="section">
      <div className="flex flex-wrap justify-center gap">
        <div className={classes.inputCard}>
          <div className="flex justify-between">
            <h2 className={classes.h2}>Entrada de Dados</h2>
            <FaGripLines size={30} className={classes.icon} />
          </div>
          <div className={classes.unit}>
            <span>Unidade:</span>
            <input
              type="text"
              className={classes.input}
              placeholder="Ex: cm, kg, m..."
              value={unitMeasure}
              onChange={e => setUnitMeasure(e.target.value)}
            />
          </div>
          <div id="data-table">
            <div className="table-header">
              <div className={classes.text}>Li (Lim. inferior)</div>
              <div className={classes.text}>Ls (Lim. Superior)</div>
              <div className={classes.text}>Fi (Freq. Individual)</div>
              <div className={`${classes.text} ${classes.action}`}>Ação</div>
            </div>
            <div id="table-body">
              {classData.map((row, idx) => (
                <div key={idx} className={`table-row ${classes.row}`}>
                  <input
                    type="number"
                    className={classes.input}
                    placeholder={`${row.li}`}
                    value={row.li === 0 ? "" : row.li}
                    onChange={e => handleClassChange(idx, "li", e.target.value)}
                    ref={el => { liRefs.current[idx] = el }}
                  />
                  <input
                    type="number"
                    className={classes.input}
                    placeholder={`${row.ls}`}
                    value={row.ls === 0 ? "" : row.ls}
                    onChange={e => handleClassChange(idx, "ls", e.target.value)}
                  />
                  <input
                    type="number"
                    className={classes.input}
                    placeholder={`${row.fi}`}
                    value={row.fi === 0 ? "" : row.fi}
                    onChange={e => handleClassChange(idx, "fi", e.target.value)}
                    ref={el => { fiRefs.current[idx] = el }}
                    onKeyDown={handleEnterKey}
                  />
                  <div className={classes.remove}>
                    <button
                      onClick={() => handleRemoveRow(idx)}
                      className={classes.removeButton}
                    >
                      <BsTrash size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.addRow} onClick={handleAddRow}>
              <BsPlusCircleFill size={26} />
              Adicionar Linha
            </div>
          </div>
        </div>

        <div className={classes.outputCard}>
          <div className={`flex justify-between ${classes.output}`}>
            <h2 className={classes.h2}>Saída de Dados</h2>
            <BsListCheck size={30} className={classes.icon} />
          </div>
          <div className={classes.options}>
            {["Moda Bruta", "Moda de Czuber", "Média", "Mediana", "Variância", "Desvio Padrão", "Coeficiênte de Variação"].map(opt => (
              <label key={opt} className={`checkbox-option ${classes.optionMargin}`}>
                <input
                  type="checkbox"
                  checked={selectedMeasures.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                />
                <span className={classes.alignOption}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {results && results.length > 0 && (
        <div className={classes.resultCard}>
          <h2 className={classes.h2}>Resultados do Cálculo</h2>
          <div>
            <div className={classes.results}>
              <Results />
            </div>
            <div className={classes.chartCenter}>
              <div className={classes.chart}>
                <FrequencyChart Li={Li} Ls={Ls} Fi={Fi} Pmi={Pmi} />
              </div>
              <div className={classes.chart}>
                <CumulativeFrequencyChart Xi={Pmi} Fa={Fa} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassPage;