import React, { useContext, useEffect } from "react";
import { StatsContext } from "../context/StatsContext";
import * as CalcFunc from "../utils/calculate";
import classes from "./Text.module.css"
import { BsTextareaT, BsListCheck } from "react-icons/bs";
import { FrequencyChart } from "../components/FrequencyChart";
import { CumulativeFrequencyChart } from "../components/CumulativeFrequencyChart";
import { Results } from "../components/Results";

const TextPage: React.FC = () => {
    const {
        textData,
        setTextData,
        unitMeasure,
        setUnitMeasure,
        results,
        setResults,
        selectedMeasures,
        setSelectedMeasures
    } = useContext(StatsContext)

    useEffect(() => {
        const sanitizedText = textData.replace(/[\s\n,;]+/g, ",");
        const values = sanitizedText.split(",").map(Number).filter(n => !isNaN(n));

        const frequencies: { [key: number]: number } = {};
        values.forEach(value => {
            frequencies[value] = (frequencies[value] || 0) + 1;
        });

        const Xi = Object.keys(frequencies).map(Number);
        const Fi = Object.values(frequencies);

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
    }, [textData, selectedMeasures, unitMeasure, setResults]);

    const handleCheckboxChange = (measure: string) => {
        if (selectedMeasures.includes(measure)) {
            setSelectedMeasures(selectedMeasures.filter(m => m !== measure));
        } else {
            setSelectedMeasures([...selectedMeasures, measure]);
        }
    };

    const processDataForChart = () => {
        const sanitizedText = textData.replace(/[\s\n,;]+/g, ",");
        const values = sanitizedText.split(",").map(Number).filter(n => !isNaN(n));

        if (values.length === 0) {
            return { Xi: [], Fi: [], Fa: [] };
        }

        const frequencies: { [key: number]: number } = {};
        values.forEach(value => {
            frequencies[value] = (frequencies[value] || 0) + 1;
        });

        const sortedXi = Object.keys(frequencies).map(Number).sort((a, b) => a - b);

        const Fi = sortedXi.map(key => frequencies[key]);

        const Fa: number[] = [];
        let cumulativeFrequency = 0;
        Fi.forEach(f => {
            cumulativeFrequency += f;
            Fa.push(cumulativeFrequency);
        });

        return { Xi: sortedXi, Fi, Fa };
    };

    const { Xi, Fi, Fa } = processDataForChart();

    return (
        <div className="section">
            <div className="flex flex-wrap justify-center gap">
                <div className={classes.textCard}>
                    <div className="flex justify-between">
                        <h2 className={classes.h2}>Entrada de Dados</h2>
                        <BsTextareaT size={30} className={classes.icon} />
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

                    <div id="data-textarea">
                        <textarea
                            id="text-input"
                            className={classes.textarea}
                            placeholder="Insira seus dados aqui separados por vírgulas, espaços ou novas linhas. Ex: 12, 15, -14, 10, -18, 20"
                            value={textData}
                            onChange={e => setTextData(e.target.value)}
                        ></textarea>
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

export default TextPage;