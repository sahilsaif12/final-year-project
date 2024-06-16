import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ClassificationOutcome from "./ClassificationOutcome";
import RegressionOutcome from "./RegressionOutcome";
import logo from "./img/logo.png"
import fileIcon from "./img/fileicon.png"
import Loader from "./Loader";
function App() {
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async() => {
    const formData = new FormData();
    formData.append("xlData",file);

    try {
      setloading(true)
      const res =await axios.post(`http://localhost:8000/api/v1/data/analysis`,formData,{
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          
      })
      const data=res.data
      setdata(data)
      setloading(false)
  } catch (error) {
      console.log(error);

  }
    // setloading(true);
    // setTimeout(() => {
    //   setloading(false);
    //   setdata(true)
    // }, 3000);

    // console.log(file);
  };
  const graphData = {
    classification: [
      {
        name: "PCA",
        separabilityIndex: "6.97",
        graph:
          "http://res.cloudinary.com/dusvay4e6/image/upload/v1717236743/sdwwuwj1immfthzwe5ys.png",
      },
      {
        name: "LDA",
        separabilityIndex: "7.05",
        graph:
          "http://res.cloudinary.com/dusvay4e6/image/upload/v1717236747/jidxiqcjr94hwvmmgzxd.png",
      },
      {
        name: "K-Means",
        separabilityIndex: "6.36",
        graph:
          "http://res.cloudinary.com/dusvay4e6/image/upload/v1717236752/zrrbnj6ywq98nfc9tneg.png",
      },
    ],
    regression: [
      {
        name: "PCR",
        rmseC: "0.7002",
        r2C: "0.997",
        rmseV: "0.7787",
        r2V: "0.995",
        rmseP: "0.7166",
        r2P: "0.997",
        trainingGraph:
          "http://res.cloudinary.com/dusvay4e6/image/upload/v1717236756/trktj1votbmlvicbtaov.png",
        testingGraph:
          "http://res.cloudinary.com/dusvay4e6/image/upload/v1717236757/wifa3a5fbafughvhzb3m.png",
      },
      {
        name: "PLSR",
        rmseC: "0.6202",
        r2C: "0.998",
        rmseV: "0.7328",
        r2V: "0.995",
        rmseP: "0.6443",
        r2P: "0.997",
        trainingGraph:
          "http://res.cloudinary.com/dusvay4e6/image/upload/v1717236761/pejguhxookv6wsghhl2z.png",
        testingGraph:
          "http://res.cloudinary.com/dusvay4e6/image/upload/v1717236762/qdovu9odhucdr3soxmnq.png",
      },
    ],
  };
  return (
    <div className="app">
      <div className=" sticky flex items-center  top-0   z-10  border-b-2 border-b-slate-300" style={{"backgroundColor":"#D4B73C"}}>
      <img src={logo} className="w-20 h-24" alt="" />
      <div className=" text-3xl font-extrabold text-slate-700"> Group 18</div>
      </div>
      <main className="main-content">
        <div id="Square"></div>

        <div id="Square2"></div>


        <div class="flex-1 mt-5 items-center max-w-screen-sm mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
  <div class="relative w-full cursor-pointer">
    <div class="items-center justify-center max-w-xl mx-auto">
      <label class="flex  text-slate-200 justify-center w-full h-32 px-4 transition bg-gray-600/80 outline-2 outline-dashed outline-offset-4 outline-gray-700  rounded-md appearance-none cursor-pointer  focus:outline-none" id="drop">
      <span class="flex items-center space-x-2">
      {file?
        <img width="30" src={fileIcon} alt=""  />
        :
       <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>

        }
      <span class="font-semibold ">{file?file.name:"Browse your file to Attach"} </span></span>
      <input type="file" name="file_upload" class="hidden"  onChange={handleFileChange} accept="image/png,image/jpeg" id="input"/>
      </label>
    </div>
  </div>
</div>
        <div className="file-upload">
          {/* <input type="file" onChange={handleFileChange} /> */}
          <button className={`butto bg-gray-800 text-white p-5 rounded-md py-3  ${!file && "cursor-not-allowed" } `} disabled={!file} onClick={handleSubmit}>
            Upload 
          </button>
        </div>
        {
          loading ?
        <Loader/>:
        <div>
        {
          data && <div>
        <ClassificationOutcome classification={data.classification} />
        <RegressionOutcome regression={data.regression} />
            
          </div>
        }
         </div>

        }
      </main>
    </div>
  );
}

export default App;
