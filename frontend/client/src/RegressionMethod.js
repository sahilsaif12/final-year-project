import React from "react";

const RegressionMethod = ({
  idx,
  title,
  trainingGraph,
  testingGraph,
  rmseC,
  r2C,
  rmseV,
  r2V,
  rmseP,
  r2P,
}) => {
  return (
    <div  className="regression-method  border-x-8 shadow-2xl glass border-t- border-t-slate-500 rounded-xl border-gray-600 mb-20   p-3 py-8     ">
        <div className="font-bold text-slate-800 text-3xl  pl-3 mb-5">
        {idx + 1}. {title}
      </div>
      <div className="graphs">
        <div className="w-5/12">
          <div className="metric flex text-xl mx-8 justify-around bg-gray-600/80  p-3 text-nowrap text-slate-200 rounded-md">
            <span  >
              RmseC: <span style={{ color: "#F2D70F" }} >{rmseC}</span>
            </span>
            <span>
              R<sup>2</sup>C: <span  style={{ color: "#F2D70F" }}> {r2C}</span>
            </span>
          </div>
         
          <div className="graph">
            <img
              src={trainingGraph}
              className="rounded-md"
              alt=""
              // style={{ height: "80%", width: "90%" }}
            />
          </div>
        </div>
        <div className="w-5/12">
        <div className="metric flex mx-8 text-xl justify-around bg-gray-600/80  p-3 text-nowrap text-slate-200 rounded-md">
            <span>
              RmseV: <span style={{ color: "#F2D70F" }}>{rmseV}</span>{" "}
            </span>
            <span>
              R<sup>2</sup>V: <span style={{ color: "#F2D70F" }}>{r2V}</span>{" "}
            </span>
          </div>

          <div className="graph ">
            <img
              src={testingGraph}
              className="rounded-md"
              alt=""
              // style={{ height: "80%", width: "90%" }}
            />
          </div>
        </div>
      </div>
      <div class="container   ">
        <div class="box ">

          RmseP: <span style={{ color: "#F2D70F" }} class="value">{rmseP}</span>
        </div>
        <div class="box">
          R<sup>2</sup>P: <span style={{ color: "#F2D70F" }}  class="value ">{r2P}</span>
        </div>
      </div>
    </div>
  );
};

export default RegressionMethod;
