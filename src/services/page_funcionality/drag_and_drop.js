function allowDrop(e) {
    e.preventDefault()
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id)
}

const loadedImages = {}

function drop(e) {
    e.preventDefault()
    const img = new Image()
    const backup = new Image()
    const ctx = document.getElementById(e.target.id).getContext('2d')
    ctx.imageSmoothingEnabled = true

    img.onload = () => {
        ctx.drawImage(img, 0, 0)

        if(img.width > img.height) {
            img.height = (img.height * 1080) / img.width
            img.width = 1080
        }
        else {
            img.width = (img.width * 560) / img.height
            img.height = 560
        }

        ctx.clearRect(0 ,0 , 1080, 560)
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
    img.src = URL.createObjectURL(e.dataTransfer.files[0])

    backup.onload = () => {
        loadedImages[e.target.id] = backup

        URL.revokeObjectURL(img.src)
    }
    backup.src = URL.createObjectURL(e.dataTransfer.files[0])
}