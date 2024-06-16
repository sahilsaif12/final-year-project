import React from "react";

const ClassificationMethod = ({ title, index, graph, idx }) => {
  return (
    <div  className="classification-method glass flex w-full  border-x-8 shadow-2xl border-t- border-t-slate-500 rounded-xl border-gray-600 mb-20   p-3 py-8   justify-around  ">
      <div className="flex flex-col relative  justify-betwee">
        <div className="font-bold text-slate-800 text-3xl mb-5">
          {idx + 1}. {title}
        </div>
        <div className="bg-gray-600 absolute bottom-1/4 p-3 text-nowrap text-slate-200 rounded-md">
        <span className="text-xl">
          Separability index: <span style={{ color: "#F2D70F" }}>{index}</span>
        </span>
        </div>
      </div>
      <div className="graphClass ">
        <img src={graph} className="h-full w-full rounded-md" alt="" />
      </div>
    </div>
  );
};

export default ClassificationMethod;
