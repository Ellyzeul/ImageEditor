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
