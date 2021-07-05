document.getElementById('button-class2-ex2').addEventListener('click', () => {
    const canvasId = 'canvas-class2-ex2'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const inverted = invertColors(imgData)
    
    placeImageDataOnCanvas(inverted, canvasId)
})
