const mean = (img1, img2) => {
    if(img1.data.length != img2.data.length) return img1

    const data1 = img1.data
    const data2 = img2.data
    const newPixels = new Uint8ClampedArray(data1.length)

    for(i = 0; i < data1.length; i++) {
        newPixels[i]   = (data1[i] + data2[i]) / 2
    }

    return createImageDataFromUint8ClampedArray(newPixels)
}

const getHistogram = (data, color = 0) => {
    const hist = new Array(256).fill(0)
    const len = data.length

    for(i = 0; i < len; i+=4) {
        hist[data[i+color]]++
    }

    return hist
}