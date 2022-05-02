const rotateImage = (img, degree) => {
    const data = img.data
    const newData = new Uint8ClampedArray()
    const width = img.width
    let pixel, v, w, x, y

    for(i = 0; i < data.length; i+=4) {
        v = i
        w = i % width
        pixel = [data[i], data[i+1], data[+2], data[i+3]]

        x = v * Math.cos(degree) - w * Math.sin(degree)
        y = v * Math.cos(degree) + w * Math.sin(degree)
        //newData[x +]
    }
}

const powerLawTransformation = (imgData, gamma) => {
    const data = imgData.data
    
    for(i=0; i < data.length; i+=4) {
        data[i]   = Math.round(255*((data[i]/255)**gamma))
        data[i+1] = Math.round(255*((data[i+1]/255)**gamma))
        data[i+2] = Math.round(255*((data[i+2]/255)**gamma))
    }

    return imgData
}

// const histogramEqualization = imgData => {
//     const data = imgData.data
//     const width = imgData.width
//     const height = imgData.height
//     const response = {
//         equalized = {
//             red: new Array(256).fill(0),
//             green: new Array(256).fill(0),
//             blue: new Array(256).fill(0)
//         },
//         unequalized = {
//             red: new Array(256).fill(0),
//             green: new Array(256).fill(0),
//             blue: new Array(256).fill(0)
//         }
//     }
//     let accFreq = {
//         red: new Array(256).fill(0),
//         green: new Array(256).fill(0),
//         blue: new Array(256).fill(0)
//     }

//     for(i=0; i < data.length; i+=4) {
//         response.unequalized.red[data[i]]++
//         response.unequalized.green[data[i+1]]++
//         response.unequalized.blue[data[i+2]]++
//     }
//     for(i=0; i < data.length; i+=4) {
//         accFreqRed += response.unequalized.red[data[i]]
//         accFreqGreen += response.unequalized.red[data[i+1]]
//         accFreqBlue += response.unequalized.red[data[i+2]]

//         data[i]   = Math.max(0, Math.round((255*accFreqRed)/(width*height)))
//         data[i+1] = Math.max(0, Math.round((255*accFreqGreen)/(width*height)))
//         data[i+2] = Math.max(0, Math.round((255*accFreqBlue)/(width*height)))

//         response.equalized.red[data[i]]++
//         response.equalized.green[data[i+1]]++
//         response.equalized.blue[data[i+2]]++
//     }
// }