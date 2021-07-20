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

const RGBtoHSL = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255

    const minRGB = Math.min(r, g, b)
    const maxRGB = Math.max(r, g, b)
    const chroma = maxRGB - minRGB

    let h = 0
    let s = 0
    let l = 0

    if (chroma == 0)      h = 0
    else if (maxRGB == r) h = ((g - b) / chroma) % 6
    else if (maxRGB == g) h = (b - r) / chroma + 2
    else                  h = (r - g) / chroma + 4

    h = Math.round(h * 40)

    if (h < 0) h += 240

    l = (maxRGB + minRGB) / 2

    s = chroma == 0 ? 0 : chroma / (1 - Math.abs(2 * l - 1))

    s = Math.round(s * 240)
    l = Math.round(l * 240)

    return {
        "hue": h,
        "saturation": s,
        "lightness": l
    }
}