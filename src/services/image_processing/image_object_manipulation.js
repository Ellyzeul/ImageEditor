const createImageDataFromUint8ClampedArray = (uint8arr, height, width) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const imgData = canvas.getContext('2d').createImageData(uint8arr)

    return imgData
}