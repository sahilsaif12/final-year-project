import React from "react";
import ClassificationMethod from "./ClassificationMethod";

const ClassificationOutcome = ({ classification }) => {
  return (
    <section className="classification-outcome  p-4">
      <div class="Logo">
        <span>Classifi</span>cation<span> Out</span>come
      </div>
      <div >
      {classification.map((item, idx) => {
        return (
          <ClassificationMethod
            title={item.name}
            index={item.separabilityIndex}
            graph={item.graph}
            idx={idx}
          />
        );
      })}
      </div>
    </section>
  );
};

export default ClassificationOutcome;
