import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ClassificationOutcome from "./ClassificationOutcome";
import RegressionOutcome from "./RegressionOutcome";
import logo from "./img/logo.png"
import fileIcon from "./img/fileicon.png"
import Loader from "./Loader";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import Fooditem from "./Fooditem";
import onionImg from './img/onion.jpg'
import oreganoImg from './img/oregano.jpg'
import spinachImg from './img/spinach.jpg'
import Table from "./Table";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState(null);
  const [foodItem, setfoodItem] = useState(null);
  const [refValue, setrefValue] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("xlData", file);
    formData.append("foodItem", foodItem);
    formData.append("refValue", refValue);
    // console.log(foodItem,refValue);
    try {
      setloading(true)
      const res = await axios.post(`http://localhost:8000/api/v1/data/analysis`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      })
      const data = res.data
      setdata(data)
      setloading(false)
    } catch (error) {
      console.log(error);

    }
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

  useEffect(() => {
    if (foodItem=='onion') {
      setrefValue(19.38)
    }
    else if (foodItem=='oregano'){
      setrefValue(14.90)
    }
    else if (foodItem=='spinach'){
      setrefValue(10.29)
    }
  }, [foodItem])
  

  return (
    <div className="app">
      <div className=" sticky flex items-center  top-0   z-10  border-b- border-b-slate-30" style={{ "backgroundColor": "#8F6200" }}>
        <img src={logo} className="w-20 h-24" alt="" />
        <div className="flex justify-between  w-full">
          <div className="text-3xl font-extrabold text-yellow-200">Quercetin Predictor</div>
          <div className=" text-2xl font-extrabold pr-4 text-slate-300/80"> Group 18</div>
        </div>
      </div>
      <main className="main-content">
        <div id="Square"></div>

        <div id="Square2"></div>


        <div class="flex-1 mt-5 items-center max-w-screen-sm mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
          <div class="relative w-full cursor-pointer">
            <div class="items-center justify-center max-w-xl mx-auto">
              <label class="flex  text-slate-200 justify-center w-full h-32 px-4 transition bg-gray-600/80 outline-2 outline-dashed outline-offset-4 outline-gray-700  rounded-md appearance-none cursor-pointer  focus:outline-none" id="drop">
                <span class="flex items-center space-x-2">
                  {file ?
                    <img width="30" src={fileIcon} alt="" />
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>

                  }
                  <span class="font-semibold ">{file ? file.name : "Browse your file to Attach"} </span></span>
                <input type="file" name="file_upload" class="hidden" onChange={handleFileChange} accept="image/png,image/jpeg" id="input" />
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
        <Menu >
        <MenuButton className="inline-flex  items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-lg font text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          {foodItem? foodItem : "Select a food item"}
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 30  "  width="30" height="30" id="down-arrow"><path d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z" class="color000000 svgShape" fill="#c5c5c5"></path></svg>
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800  p-1 -mt-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <button onClick={()=>setfoodItem("onion")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Onion
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={()=>setfoodItem("oregano")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Oregano
              </button>
            </MenuItem>
            <MenuItem>
              <button onClick={()=>setfoodItem("spinach")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Spinach
              </button>
            </MenuItem>
           
          </MenuItems>
        </Transition>
      </Menu>
      </div>

      {foodItem=='onion' && <Fooditem name='Onion' img={onionImg} other1st="Fisetin(<1 mg)" other2nd="Thiosulfinates [3-20 mg]" other3rd="Thiopropanal S-oxide[ 7.5-20 mg]" quercetin={19.38} /> }
      {foodItem=='oregano' && <Fooditem name='Oregano' img={oreganoImg} other1st="Sesquiterpene (200 mg)" other2nd="Carvacrol(1300mg) " other3rd="Terpineol alcohol[1-60 mg]" quercetin={14.90} /> }
      {foodItem=='spinach' && <Fooditem name='Spinach' img={spinachImg} other1st="Lutein (12mg)" other2nd="Kaempferol [6.8-10mg]" other3rd="Zeaxanthin[0.7-3.7mg]" quercetin={10.29} /> }
      

        <div className="file-upload mt-4">
          {/* <input type="file" onChange={handleFileChange} /> */}
          <button className={`butto disabled:bg-slate-700 bg-slate-900 text-white p-5 rounded-md py-3  ${!(file && foodItem) && "cursor-not-allowed"} `} disabled={!(file && foodItem)} onClick={handleSubmit}>
            Analyze & predict
          </button>
        </div>
        {
          loading ?
            <Loader /> :
            <div>
              {
                data && <div>
                  <ClassificationOutcome classification={data.classification} />
                  <RegressionOutcome regression={data.regression} />
                  <Table name="PCR" food={data.foodItem} prediction={data.pcrPrediction} accuracy={data.pcrAccuracy} refValue={data.refValue} />
                  <Table name="PLSR" food={data.foodItem} prediction={data.plsrPrediction} accuracy={data.plsrAccuracy} refValue={data.refValue} />
                </div>
              }

            </div>

        }
      </main>
    </div>
  );
}

export default App;
