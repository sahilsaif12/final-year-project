
import { spawn } from "child_process";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const executePythonScript = (filename, data) => {
    return new Promise((resolve, reject) => {
        const python = spawn('python', [`src/python/${filename}`, JSON.stringify(data)]);

        python.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        python.stderr.on('data', (data) => {
            reject(data.toString());
        });
    });
}



const dataAnalysis = async (req, res) => {
    const data = req.file?.path

    let classification = []
    // try {
    const pcaResult = await executePythonScript('pca.py', data);
    classification[0] = {}
    classification[0].name = "PCA"
    classification[0].separabilityIndex = pcaResult.trim()
    const pcaGraph = await uploadOnCloudinary('pca.png')
    if (!pcaGraph) {
        throw new Error("pca graph not found")
    }
    classification[0].graph = pcaGraph.url


    const ldaResult = await executePythonScript('lda.py', data);
    classification[1] = {}
    classification[1].name = "LDA"
    classification[1].separabilityIndex = ldaResult.trim()
    const ldaGraph = await uploadOnCloudinary('lda.png')
    if (!ldaGraph) {
        throw new Error("lda graph not found")
    }
    classification[1].graph = ldaGraph.url


    const kmeansResult = await executePythonScript('kmeans.py', data);
    classification[2] = {}
    classification[2].name = "K-Means"
    classification[2].separabilityIndex = kmeansResult.trim()
    const kmeansGraph = await uploadOnCloudinary('kmeans.png')
    if (!kmeansGraph) {
        throw new Error("kmeans graph not found")
    }
    classification[2].graph = kmeansGraph.url


    let regression=[]
    let pcrResult = await executePythonScript('pcr.py', data);
    pcrResult =pcrResult.trim().split(" ")
    regression[0] = {}
    regression[0].name = "PCR"
    regression[0].rmseC = pcrResult[0]
    regression[0].r2C = pcrResult[3].slice(0,-1)
    regression[0].rmseV = pcrResult[1]
    regression[0].r2V = pcrResult[4].slice(0,-1)
    regression[0].rmseP = pcrResult[2]
    regression[0].r2P = pcrResult[5].slice(0,-1)
    const pcrTrainGraph = await uploadOnCloudinary('pcr_training.png')
    if (!pcrTrainGraph) {
        throw new Error("pcr training graph not found")
    }
    regression[0].trainingGraph = pcrTrainGraph.url
    const pcrTestGraph = await uploadOnCloudinary('pcr_testing.png')
    if (!pcrTestGraph) {
        throw new Error("pcr testing graph not found")
    }
    regression[0].testingGraph = pcrTestGraph.url


    let plsrResult = await executePythonScript('plsr.py', data);
    plsrResult =plsrResult.trim().split(" ")
    regression[1] = {}
    regression[1].name = "PLSR"
    regression[1].rmseC = plsrResult[0]
    regression[1].r2C = plsrResult[3].slice(0,-1)
    regression[1].rmseV = plsrResult[1]
    regression[1].r2V = plsrResult[4].slice(0,-1)
    regression[1].rmseP = plsrResult[2]
    regression[1].r2P = plsrResult[5].slice(0,-1)
    const plsrTrainGraph = await uploadOnCloudinary('plsr_training.png')
    if (!plsrTrainGraph) {
        throw new Error("plsr training graph not found")
    }
    regression[1].trainingGraph = plsrTrainGraph.url
    const plsrTestGraph = await uploadOnCloudinary('plsr_testing.png')
    if (!plsrTestGraph) {
        throw new Error("plsr testing graph not found")
    }
    regression[1].testingGraph = plsrTestGraph.url




    fs.unlinkSync(req.file.path);
    res.status(200)
        .json({ classification,regression })
    // } catch (error) {
    //     console.log(error);
    // }
}

export {
    dataAnalysis
}