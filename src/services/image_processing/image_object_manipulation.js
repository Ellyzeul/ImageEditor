const createImageDataFromUint8ClampedArray = (img, uint8arr, height, width) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const imgData = canvas.getContext('2d').createImageData(img)
    imgData.data = uint8arr

    return imgData
}