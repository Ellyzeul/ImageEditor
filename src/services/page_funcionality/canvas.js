const placeImageDataOnCanvas = (imgData, canvasId) => {
    const ctx = document.getElementById(canvasId).getContext('2d')
    const img = new Image()
    const backup = new Image()

    img.onload = () => {
        if(imgData.width > imgData.height) {
            img.height = (imgData.height * 1080) / imgData.width
            img.width = 1080
        }
        else {
            img.width = (imgData.width * 560) / imgData.height
            img.height = 560
        }

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 1080, 560)
        ctx.drawImage(
            img,
            img.width < 1080 ? 540 - (img.width /2) : 0, 
            img.height < 560 ? 280 - (img.height /2) : 0, 
            img.width, 
            img.height
        )
    }
    const canvas = document.createElement('canvas')
    canvas.width = imgData.width
    canvas.height = imgData.height
    canvas.getContext('2d').putImageData(imgData, 0, 0)

    const imgURL = canvas.toDataURL()

    img.src = imgURL

    backup.onload = () => loadedImages[canvasId] = backup
    backup.src = imgURL
}

const copyImageDataFromImage = img => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d').drawImage(img, 0, 0)

    return canvas.getContext('2d').getImageData(0, 0, img.width, img.height)
}
const getImageDataFromImage = (img) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    return ctx.getImageData(0, 0, img.width, img.height)
}