document.getElementById('button-class2-ex2').addEventListener('click', () => {
    const canvasId = 'canvas-class2-ex2'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = invertColors(imgData)
    
    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class5-ex1').addEventListener('click', () => {
    const gamma = document.querySelector("#input-class5-ex1_gamma").value

    if(gamma === "") {
        alert("Preencha o valor de γ")
        return
    }

    const canvasId = 'canvas-class5-ex1'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = powerLawTransformation(imgData, gamma)
    
    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class5-ex2').addEventListener('click', () => {
    const canvasId = 'canvas-class5-ex2'
    const imgData = getImageDataFromImage(loadedImages[canvasId])

    const meanImg = Mean(imgData)
    const medianImg = Median(imgData)

    placeImageDataOnCanvas(meanImg, "class5-ex2-mean")
    placeImageDataOnCanvas(medianImg, "class5-ex2-median")
})

document.getElementById('button-class5-ex3').addEventListener('click', () => {
    const canvasId = 'canvas-class5-ex3'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = Sobel(imgData)

    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class5-ex4').addEventListener('click', () => {
    const canvasId = 'canvas-class5-ex4'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = Laplace8(imgData)

    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class5-ex5').addEventListener('click', () => {
    const limiar = document.querySelector('#input-class5-ex5').value

    if(limiar === "") {
        alert("Preencha o valor de T")
        return
    }

    const canvasId = 'canvas-class5-ex5'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = Limiarization(imgData, limiar)

    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class5-ex6').addEventListener('click', () => {
    const canvasId = 'canvas-class5-ex6'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = Equalization(imgData)

    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class8-ex1').addEventListener('click', () => {
    const noiseRate = document.querySelector("#input-class8-ex1").value

    if(noiseRate === "") {
        alert("Insira uma porcentagem de ruído")
        return
    }

    const canvasId = 'canvas-class8-ex1'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = saltAndPepper(imgData, noiseRate)

    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class8-ex2').addEventListener('click', () => {
    const canvasId = 'canvas-class8-ex2'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = Mean(imgData)

    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class8-ex3').addEventListener('click', () => {
    const canvasId = 'canvas-class8-ex3'
    const imgData = getImageDataFromImage(loadedImages[canvasId])
    const newImg = Median(imgData)

    placeImageDataOnCanvas(newImg, canvasId)
})

document.getElementById('button-class8-ex4').addEventListener('click', () => {
    const canvasId = 'canvas-class8-ex4'
    const imgData = getImageDataFromImage(loadedImages[canvasId])

    const meanImg = Mean(imgData)
    const medianImg = Median(imgData)

    placeImageDataOnCanvas(meanImg, "class8-ex4-mean")
    placeImageDataOnCanvas(medianImg, "class8-ex4-median")
})

document.getElementById('button-class9-ex4').addEventListener('click', () => {
    const canvasId = 'canvas-class9-ex4'
    const imgData = getImageDataFromImage(loadedImages[canvasId])

    const laplace4 = Laplace(imgData)
    const laplace8 = Laplace8(imgData)

    placeImageDataOnCanvas(laplace4, "class9-ex4-nghb4")
    placeImageDataOnCanvas(laplace8, "class9-ex4-nghb8")
})