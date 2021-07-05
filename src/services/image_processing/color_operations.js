const invertColors = imgData => {
    const data = imgData.data

    for(i = 0; i < data.length; i+=4) {
        data[i]   = 255 - data[i]
        data[i+1] = 255 - data[i+1]
        data[i+2] = 255 - data[i+2]
    }

    return imgData
}
const removeRed = imgData => {
    const data = imgData.data

    for(i = 0; i < data.length; i+=4) {
        data[i] = 0
    }
    
    return imgData
}
const removeGreen = imgData => {
    const data = imgData.data

    for(i = 0; i < data.length; i+=4) {
        data[i+1] = 0
    }
    
    return imgData
}
const removeBlue = imgData => {
    const data = imgData.data

    for(i = 0; i < data.length; i+=4) {
        data[i+2] = 0
    }
    
    return imgData
}