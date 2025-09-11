import React, { useContext, useEffect, useRef } from "react";
import { StatsContext } from "../context/StatsContext";
import * as CalcFunc from "../utils/calculate";
import classes from "./Table.module.css";
import { BsPlusCircleFill, BsTable, BsListCheck, BsTrash } from "react-icons/bs";
import { FrequencyChart } from "../components/FrequencyChart";
import { CumulativeFrequencyChart } from "../components/CumulativeFrequencyChart";
import { Results } from "../components/Results";

const TablePage: React.FC = () => {
    const {
        tableData,
        setTableData,
        unitMeasure,
        setUnitMeasure,
        results,
        setResults,
        selectedMeasures,
        setSelectedMeasures,
    } = useContext(StatsContext);

    const xiRefs = useRef<(HTMLInputElement | null)[]>([]);
    const fiRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const filteredTableData = tableData.filter(row => row.xi !== 0 || row.fi !== 0);
        const Xi = filteredTableData.map(row => row.xi);
        const Fi = filteredTableData.map(row => row.fi);

        const Fa: number[] = [];
        let cumulativeFrequency = 0;
        Fi.forEach(f => {
            cumulativeFrequency += f;
            Fa.push(cumulativeFrequency);
        });

        if (Xi.length === 0) {
            setResults([]);
            return;
        }

        const newResults: { label: string; value: string | number }[] = [];

        selectedMeasures.forEach(measure => {
            switch (measure) {
                case "Moda":
                    const modas = CalcFunc.calcModa(Xi, Fi) as number[];
                    newResults.push({
                        label: "Moda",
                        value: `${CalcFunc.getModaType(modas)}: (${modas.join(", ")}) ${unitMeasure}`,
                    });
                    break;
                case "Média":
                    newResults.push({ label: "Média", value: `${CalcFunc.calcMedia(Xi, Fi)} ${unitMeasure}` });
                    break;
                case "Mediana":
                    newResults.push({ label: "Mediana", value: `${CalcFunc.calcMediana(Xi, Fi)} ${unitMeasure}` });
                    break;
                case "Variância":
                    newResults.push({ label: "Variância", value: `${CalcFunc.calcVariancia(Xi, Fi)} ${unitMeasure}` });
                    break;
                case "Desvio Padrão":
                    newResults.push({
                        label: "Desvio Padrão",
                        value: `${CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(Xi, Fi))} ${unitMeasure}`,
                    });
                    break;
                case "Coeficiênte de Variação":
                    newResults.push({
                        label: "Coeficiente de Variação",
                        value: `${CalcFunc.calcCoeficienteVariacao(
                            CalcFunc.calcDesvioPadrao(CalcFunc.calcVariancia(Xi, Fi)),
                            CalcFunc.calcMedia(Xi, Fi)
                        )}%`,
                    });
                    break;
            }
        });

        setResults(newResults);
    }, [tableData, selectedMeasures, unitMeasure, setResults]);

    
    useEffect(() => {
        const lastRowIndex = tableData.length - 1;
        if (xiRefs.current[lastRowIndex]) {
            xiRefs.current[lastRowIndex]?.focus();
        }
    }, [tableData.length]);

    const handleTableChange = (index: number, field: "xi" | "fi", value: string) => {
        const updated = [...tableData];
        updated[index][field] = Number(value);
        setTableData(updated);
    };

    const handleRemoveRow = (index: number) => {
        const updated = tableData.filter((_, i) => i !== index);
        setTableData(updated);
    };

    const handleAddRow = () => {
        setTableData([...tableData, { xi: 0, fi: 0 }]);
    };

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
    };

    const processDataForCharts = () => {
        const filteredTableData = tableData.filter(row => row.xi !== 0 || row.fi !== 0);

        filteredTableData.sort((a, b) => a.xi - b.xi);

        const Xi = filteredTableData.map(row => row.xi);
        const Fi = filteredTableData.map(row => row.fi);

        const Fa: number[] = [];
        let cumulativeFrequency = 0;
        Fi.forEach(f => {
            cumulativeFrequency += f;
            Fa.push(cumulativeFrequency);
        });

        return { Xi, Fi, Fa };
    };

    const { Xi, Fi, Fa } = processDataForCharts();

    return (
        <div className="section">
            <div className="flex flex-wrap justify-center gap">
                <div className={classes.inputCard}>
                    <div className="flex justify-between">
                        <h2 className={classes.h2}>Entrada de Dados</h2>
                        <BsTable size={30} className={classes.icon} />
                    </div>
                    <div className={classes.unit}>
                        <span>Unidade:</span>
                        <input
                            type="text"
                            className={classes.input}
                            placeholder="Ex: cm, kg..."
                            value={unitMeasure}
                            onChange={e => setUnitMeasure(e.target.value)}
                        />
                    </div>
                    <div id="data-table">
                        <div className="table-header">
                            <div className={classes.text}>Xi (Valor)</div>
                            <div className={classes.text}>Fi (Freq.)</div>
                            <div className={classes.text}>Ação</div>
                        </div>
                        <div id="table-body">
                            {tableData.map((row, idx) => (
                                <div key={idx} className={`table-row ${classes.row}`}>
                                    <input
                                        type="number"
                                        className={classes.input}
                                        placeholder={`${row.xi}`}
                                        value={row.xi === 0 ? "" : row.xi}
                                        onChange={e => handleTableChange(idx, "xi", e.target.value)}
                                        ref={el => { xiRefs.current[idx] = el }} 
                                    />
                                    <input
                                        type="number"
                                        className={classes.input}
                                        placeholder={`${row.fi}`}
                                        value={row.fi === 0 ? "" : row.fi}
                                        onChange={e => handleTableChange(idx, "fi", e.target.value)}
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
                        {["Moda", "Média", "Mediana", "Variância", "Desvio Padrão", "Coeficiênte de Variação"].map(opt => (
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
                                <FrequencyChart Xi={Xi} Fi={Fi} />
                            </div>
                            <div className={classes.chart}>
                                <CumulativeFrequencyChart Xi={Xi} Fa={Fa} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablePage;