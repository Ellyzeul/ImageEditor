const changeDisplayColor = () => {
    const red = document.getElementById("red").value
    const green = document.getElementById("green").value
    const blue = document.getElementById("blue").value

    document.getElementById("color_display").style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
}
const verifyTargetValue = target => {
    if(target.value > 255) {
        target.value = 255
        return
    }
    if(target.value < 0) {
        target.value = 0
        return
    }
}


const placeHSLValues = (red, green, blue) => {
    const hsl = RGBtoHSL(red, green, blue)
    console.log(red, green, blue)
    console.log(hsl)

    document.getElementById("hue").value = hsl.hue
    document.getElementById("saturation").value = hsl.saturation
    document.getElementById("lightness").value = hsl.lightness

    changeDisplayColor()
}

document.getElementById("red").addEventListener("input", e => {
    verifyTargetValue(e.target)

    const red = e.target.value
    const green = document.getElementById("green").value
    const blue = document.getElementById("blue").value

    placeHSLValues(red, green, blue)
})
document.getElementById("green").addEventListener("input", e => {
    verifyTargetValue(e.target)

    const red = document.getElementById("red").value
    const green = e.target.value
    const blue = document.getElementById("blue").value

    placeHSLValues(red, green, blue)
})
document.getElementById("blue").addEventListener("input", e => {
    verifyTargetValue(e.target)

    const red = document.getElementById("red").value
    const green = document.getElementById("green").value
    const blue = e.target.value

    placeHSLValues(red, green, blue)
})


const placeRGBValues = (hue, saturation, lightness) => {
    const rgb = HSLtoRGB(hue, saturation, lightness)

    document.getElementById("red").value = rgb.red
    document.getElementById("green").value = rgb.green
    document.getElementById("blue").value = rgb.blue

    changeDisplayColor()
}

document.getElementById("hue").addEventListener("input", e => {
    verifyTargetValue(e.target)

    const hue = e.target.value
    const saturation = document.getElementById("saturation").value
    const lightness = document.getElementById("lightness").value

    placeRGBValues(hue, saturation, lightness)
})
document.getElementById("saturation").addEventListener("input", e => {
    verifyTargetValue(e.target)

    const hue = document.getElementById("hue").value
    const saturation = e.target.value
    const lightness = document.getElementById("lightness").value

    placeRGBValues(hue, saturation, lightness)
})
document.getElementById("lightness").addEventListener("input", e => {
    verifyTargetValue(e.target)

    const hue = document.getElementById("hue").value
    const saturation = document.getElementById("saturation").value
    const lightness = e.target.value

    placeRGBValues(hue, saturation, lightness)
})