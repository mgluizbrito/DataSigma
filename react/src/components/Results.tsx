import { useContext } from "react";
import { StatsContext } from "../context/StatsContext";

import classes from "./Results.module.css"

export const Results = () => {
  const { results } = useContext(StatsContext);

  if (!results) return null;

  return (
    <>
      {results.map((r, idx) => (
        <div key={idx} className={classes.resultItem}>
          <h3 className={classes.h3}>{r.label}</h3>
          <h3 className={classes.value}>{r.value}</h3>
        </div>
      ))}
    </>
  );
};
