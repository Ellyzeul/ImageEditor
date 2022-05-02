const bindPixelAt = (data, width) => {
    return (x, y, i) => {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    }
  }

  const convoluteAt = (pixelAt, mask, x, y) => {
    const M = mask.length
    const N = mask[0].length
    const convoluted = {
        red: 0,
        green: 0,
        blue: 0
    }

    for(i = -Math.floor(M/2); i <= Math.floor(M/2); i++) {
        for(j = -Math.floor(N/2); j <= Math.floor(N/2); j++) {
            convoluted.red += pixelAt(x+i, y+j, 0)
            convoluted.green += pixelAt(x+i, y+j, 1)
            convoluted.blue += pixelAt(x+i, y+j, 2)
        }
    }

    return convoluted
}

const maskApplier = (img, mask, normalize=false) => {
    // variables of input image
    const data = img.data
    const height = img.height
    const width = img.width
    const input =  bindPixelAt(data, width)

    //variables of mask
    const M = mask.length
    const N = mask[0].length

    //output data
    const output = new Uint8ClampedArray(data)

    //if it's needed to normalize, here it will be treated
    let sum = 0
    for(a=0; a < M; a++)
        for(b=0; b < M; b++)
            sum += mask[a][b]
    const norma = normalize ? sum : 1

    let convoluted

    for(x=Math.floor(M/2); x < height; x++) {
        for(y=Math.floor(N/2); y < width; y++) {
            convoluted = convoluteAt(input, mask, x, y)
            output[((width * y) + x) * 4]     = convoluted.red   / norma
            output[((width * y) + x) * 4 + 1] = convoluted.green / norma
            output[((width * y) + x) * 4 + 2] = convoluted.blue  / norma
        }
    }

    img.data = output

    return img
}

const img = {
    data: new Uint8ClampedArray(400),
    width: 10,
    height: 10
}
const mask = [
    [-1,0,1],
    [-2,0,2],
    [-1,0,1]
]

img.data[((img.width * 4) + 2) * 4] = 2
img.data[((img.width * 5) + 2) * 4] = 2
img.data[((img.width * 6) + 2) * 4] = 2

const result = maskApplier(img, mask)

console.log(result.data[((img.width * 1) + 0) * 4])
console.log(result.data[((img.width * 1) + 1) * 4])
console.log(result.data[((img.width * 1) + 2) * 4])
console.log(result.data[((img.width * 1) + 3) * 4])
console.log(result.data[((img.width * 1) + 4) * 4])
console.log(result.data[((img.width * 1) + 5) * 4])
console.log(result.data[((img.width * 1) + 6) * 4])
console.log()
console.log(result.data[((img.width * 2) + 0) * 4])
console.log(result.data[((img.width * 2) + 1) * 4])
console.log(result.data[((img.width * 2) + 2) * 4])
console.log(result.data[((img.width * 2) + 3) * 4])
console.log(result.data[((img.width * 2) + 4) * 4])
console.log(result.data[((img.width * 2) + 5) * 4])
console.log(result.data[((img.width * 2) + 6) * 4])
console.log()
console.log(result.data[((img.width * 3) + 0) * 4])
console.log(result.data[((img.width * 3) + 1) * 4])
console.log(result.data[((img.width * 3) + 2) * 4])
console.log(result.data[((img.width * 3) + 3) * 4])
console.log(result.data[((img.width * 3) + 4) * 4])
console.log(result.data[((img.width * 3) + 5) * 4])
console.log(result.data[((img.width * 3) + 6) * 4])
console.log()
console.log(result.data[((img.width * 4) + 0) * 4])
console.log(result.data[((img.width * 4) + 1) * 4])
console.log(result.data[((img.width * 4) + 2) * 4])
console.log(result.data[((img.width * 4) + 3) * 4])
console.log(result.data[((img.width * 4) + 4) * 4])
console.log(result.data[((img.width * 4) + 5) * 4])
console.log(result.data[((img.width * 4) + 6) * 4])
console.log()
console.log(result.data[((img.width * 5) + 0) * 4])
console.log(result.data[((img.width * 5) + 1) * 4])
console.log(result.data[((img.width * 5) + 2) * 4])
console.log(result.data[((img.width * 5) + 3) * 4])
console.log(result.data[((img.width * 5) + 4) * 4])
console.log(result.data[((img.width * 5) + 5) * 4])
console.log(result.data[((img.width * 5) + 6) * 4])