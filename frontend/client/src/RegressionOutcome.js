import React from "react";
import RegressionMethod from "./RegressionMethod";

const RegressionOutcome = ({ regression }) => {
  return (
    <section  className="regression-outcome   px-4">
      <div class="Logo">
        <span>Regre</span>ssion<span> Out</span>come
      </div>
      {regression.map((item, idx) => {
        return (
          <RegressionMethod
            idx={idx}
            title={item.name}
            trainingGraph={item.trainingGraph}
            testingGraph={item.testingGraph}
            rmseC={item.rmseC}
            r2C={item.r2C}
            rmseV={item.rmseV}
            r2V={item.r2V}
            rmseP={item.rmseP}
            r2P={item.r2P}
          />
        );
      })}
    </section>
  );
};

export default RegressionOutcome;
