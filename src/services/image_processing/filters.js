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

const maskApplier = (img, mask, normalize=true) => {
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
            sum += Math.abs(mask[a][b])
    const norma = normalize ? sum : 1

    let convoluted

    for(x=Math.floor(M/2); x < height-Math.floor(M/2); x++) {
        for(y=Math.floor(N/2); y < width-Math.floor(N/2); y++) {
            convoluted = convoluteAt(input, mask, x, y)
            output[((width * y) + x) * 4]     = convoluted.red   / norma
            output[((width * y) + x) * 4 + 1] = convoluted.green / norma
            output[((width * y) + x) * 4 + 2] = convoluted.blue  / norma
        }
    }
    img.data = output
    console.log(output)
    return img
}

function Sobel(imageData) {
  if (!(this instanceof Sobel)) {
    return new Sobel(imageData);
  }

  var width = imageData.width;
  var height = imageData.height;

  var kernelX = [
    [-1,0,1],
    [-2,0,2],
    [-1,0,1]
  ];

  var kernelY = [
    [-1,-2,-1],
    [0,0,0],
    [1,2,1]
  ];

  var sobelData = [];
  var grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i) {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    };
  }

  var data = imageData.data;
  var pixelAt = bindPixelAt(data);
  var x, y;

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var r = pixelAt(x, y, 0);
      var g = pixelAt(x, y, 1);
      var b = pixelAt(x, y, 2);

      var avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  pixelAt = bindPixelAt(grayscaleData);

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var pixelX = (
          (kernelX[0][0] * pixelAt(x - 1, y - 1)) +
          (kernelX[0][1] * pixelAt(x, y - 1)) +
          (kernelX[0][2] * pixelAt(x + 1, y - 1)) +
          (kernelX[1][0] * pixelAt(x - 1, y)) +
          (kernelX[1][1] * pixelAt(x, y)) +
          (kernelX[1][2] * pixelAt(x + 1, y)) +
          (kernelX[2][0] * pixelAt(x - 1, y + 1)) +
          (kernelX[2][1] * pixelAt(x, y + 1)) +
          (kernelX[2][2] * pixelAt(x + 1, y + 1))
      );

      var pixelY = (
        (kernelY[0][0] * pixelAt(x - 1, y - 1)) +
        (kernelY[0][1] * pixelAt(x, y - 1)) +
        (kernelY[0][2] * pixelAt(x + 1, y - 1)) +
        (kernelY[1][0] * pixelAt(x - 1, y)) +
        (kernelY[1][1] * pixelAt(x, y)) +
        (kernelY[1][2] * pixelAt(x + 1, y)) +
        (kernelY[2][0] * pixelAt(x - 1, y + 1)) +
        (kernelY[2][1] * pixelAt(x, y + 1)) +
        (kernelY[2][2] * pixelAt(x + 1, y + 1))
      );

      var magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY))>>>0;

      sobelData.push(magnitude, magnitude, magnitude, 255);
    }
  }

  var clampedArray = sobelData;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(sobelData);
  }

  clampedArray.toImageData = function() {
    return Sobel.toImageData(clampedArray, width, height);
  };

  return clampedArray.toImageData();
}
Sobel.toImageData = function toImageData(data, width, height) {
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new FakeImageData(data, width, height);
      }
    } else {
      return new FakeImageData(data, width, height);
    }
  }
}
function FakeImageData(data, width, height) {
  return {
    width: width,
    height: height,
    data: data
  }
}
////////////////////////////////////////////////////////////////
function Laplace(imageData) {
  if (!(this instanceof Laplace)) {
    return new Laplace(imageData);
  }

  var width = imageData.width;
  var height = imageData.height;

  var mask = [
    [0, 1, 0],
    [1,-4, 1],
    [0, 1, 0]
  ]

  var laplaceData = [];
  var grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i) {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    };
  }

  var data = imageData.data;
  var pixelAt = bindPixelAt(data);
  var x, y;

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var r = pixelAt(x, y, 0);
      var g = pixelAt(x, y, 1);
      var b = pixelAt(x, y, 2);

      var avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  pixelAt = bindPixelAt(grayscaleData);

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var pixel = (
          (mask[0][0] * pixelAt(x - 1, y - 1)) +
          (mask[0][1] * pixelAt(x, y - 1)) +
          (mask[0][2] * pixelAt(x + 1, y - 1)) +
          (mask[1][0] * pixelAt(x - 1, y)) +
          (mask[1][1] * pixelAt(x, y)) +
          (mask[1][2] * pixelAt(x + 1, y)) +
          (mask[2][0] * pixelAt(x - 1, y + 1)) +
          (mask[2][1] * pixelAt(x, y + 1)) +
          (mask[2][2] * pixelAt(x + 1, y + 1))
      );

      laplaceData.push(pixel, pixel, pixel, 255);
    }
  }

  var clampedArray = laplaceData;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(laplaceData);
  }

  clampedArray.toImageData = function() {
    return Laplace.toImageData(clampedArray, width, height);
  };

  return clampedArray.toImageData();
}
Laplace.toImageData = function toImageData(data, width, height) {
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new FakeImageData(data, width, height);
      }
    } else {
      return new FakeImageData(data, width, height);
    }
  }
};
////////////////////////////////////////////////////////////////
function Laplace8(imageData) {
  if (!(this instanceof Laplace8)) {
    return new Laplace8(imageData);
  }

  var width = imageData.width;
  var height = imageData.height;

  var mask = [
    [1, 1, 1],
    [1,-8, 1],
    [1, 1, 1]
  ]

  var laplaceData = [];
  var grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i) {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    };
  }

  var data = imageData.data;
  var pixelAt = bindPixelAt(data);
  var x, y;

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var r = pixelAt(x, y, 0);
      var g = pixelAt(x, y, 1);
      var b = pixelAt(x, y, 2);

      var avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  pixelAt = bindPixelAt(grayscaleData);

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var pixel = (
          (mask[0][0] * pixelAt(x - 1, y - 1)) +
          (mask[0][1] * pixelAt(x, y - 1)) +
          (mask[0][2] * pixelAt(x + 1, y - 1)) +
          (mask[1][0] * pixelAt(x - 1, y)) +
          (mask[1][1] * pixelAt(x, y)) +
          (mask[1][2] * pixelAt(x + 1, y)) +
          (mask[2][0] * pixelAt(x - 1, y + 1)) +
          (mask[2][1] * pixelAt(x, y + 1)) +
          (mask[2][2] * pixelAt(x + 1, y + 1))
      );

      laplaceData.push(pixel, pixel, pixel, 255);
    }
  }

  var clampedArray = laplaceData;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(laplaceData);
  }

  clampedArray.toImageData = function() {
    return Laplace8.toImageData(clampedArray, width, height);
  };

  return clampedArray.toImageData();
}
Laplace8.toImageData = function toImageData(data, width, height) {
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new FakeImageData(data, width, height);
      }
    } else {
      return new FakeImageData(data, width, height);
    }
  }
};
////////////////////////////////////////////////////////////////
function Mean(imageData) {
  if (!(this instanceof Mean)) {
    return new Mean(imageData);
  }

  var width = imageData.width;
  var height = imageData.height;

  var mask = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ]

  var meanData = [];
  var grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i) {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    };
  }

  var data = imageData.data;
  var pixelAt = bindPixelAt(data);
  var x, y;

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var r = pixelAt(x, y, 0);
      var g = pixelAt(x, y, 1);
      var b = pixelAt(x, y, 2);

      var avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  pixelAt = bindPixelAt(grayscaleData);

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var pixel = (
          (mask[0][0] * pixelAt(x - 1, y - 1)) +
          (mask[0][1] * pixelAt(x, y - 1)) +
          (mask[0][2] * pixelAt(x + 1, y - 1)) +
          (mask[1][0] * pixelAt(x - 1, y)) +
          (mask[1][1] * pixelAt(x, y)) +
          (mask[1][2] * pixelAt(x + 1, y)) +
          (mask[2][0] * pixelAt(x - 1, y + 1)) +
          (mask[2][1] * pixelAt(x, y + 1)) +
          (mask[2][2] * pixelAt(x + 1, y + 1))
      ) / 9;

      meanData.push(pixel, pixel, pixel, 255);
    }
  }

  var clampedArray = meanData;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(meanData);
  }

  clampedArray.toImageData = function() {
    return Mean.toImageData(clampedArray, width, height);
  };

  return clampedArray.toImageData();
}
Mean.toImageData = function toImageData(data, width, height) {
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new FakeImageData(data, width, height);
      }
    } else {
      return new FakeImageData(data, width, height);
    }
  }
};
////////////////////////////////////////////////////////////////
function Median(imageData) {
  if (!(this instanceof Median)) {
    return new Median(imageData);
  }

  var width = imageData.width;
  var height = imageData.height;

  var medianData = [];
  var grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i) {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    };
  }

  var data = imageData.data;
  var pixelAt = bindPixelAt(data);
  var x, y;

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var r = pixelAt(x, y, 0);
      var g = pixelAt(x, y, 1);
      var b = pixelAt(x, y, 2);

      var avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  pixelAt = bindPixelAt(grayscaleData);

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {

      var neighborhood = [
          pixelAt(x - 1, y - 1),
          pixelAt(x, y - 1),
          pixelAt(x + 1, y - 1),
          pixelAt(x - 1, y),
          pixelAt(x, y),
          pixelAt(x + 1, y),
          pixelAt(x - 1, y + 1),
          pixelAt(x, y + 1),
          pixelAt(x + 1, y + 1)
      ]

      var pixel = neighborhood.sort()[4]

      medianData.push(pixel, pixel, pixel, 255);
    }
  }

  var clampedArray = medianData;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(medianData);
  }

  clampedArray.toImageData = function() {
    return Median.toImageData(clampedArray, width, height);
  };

  return clampedArray.toImageData();
}
Median.toImageData = function toImageData(data, width, height) {
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new FakeImageData(data, width, height);
      }
    } else {
      return new FakeImageData(data, width, height);
    }
  }
};
////////////////////////////////////////////////////////////////
function Limiarization(imageData, limiar) {
  if (!(this instanceof Limiarization)) {
    return new Limiarization(imageData, limiar);
  }

  var width = imageData.width;
  var height = imageData.height;

  var limiarizationData = [];
  var grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i) {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    };
  }

  var data = imageData.data;
  var pixelAt = bindPixelAt(data);
  var x, y;

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var r = pixelAt(x, y, 0);
      var g = pixelAt(x, y, 1);
      var b = pixelAt(x, y, 2);

      var avg = (r + g + b) / 3;
      grayscaleData.push(avg, avg, avg, 255);
    }
  }

  pixelAt = bindPixelAt(grayscaleData);

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var pixel = (pixelAt(x, y) <= limiar) ? 0 : 255

      limiarizationData.push(pixel, pixel, pixel, 255);
    }
  }

  var clampedArray = limiarizationData;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(limiarizationData);
  }

  clampedArray.toImageData = function() {
    return Limiarization.toImageData(clampedArray, width, height);
  };

  return clampedArray.toImageData();
}
Limiarization.toImageData = function toImageData(data, width, height) {
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new FakeImageData(data, width, height);
      }
    } else {
      return new FakeImageData(data, width, height);
    }
  }
};
////////////////////////////////////////////////////////////////
function LaplaceHighlight(imageData) {
  if (!(this instanceof LaplaceHighlight)) {
    return new LaplaceHighlight(imageData);
  }

  var width = imageData.width;
  var height = imageData.height;

  var mask = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]
  ]

  var laplaceData = [];
  var grayscaleData = [];

  function bindPixelAt(data) {
    return function(x, y, i) {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    };
  }

  var data = imageData.data;
  var pixelAt = bindPixelAt(data);
  var x, y;

  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      var pixelR = (
          (mask[0][0] * pixelAt(x - 1, y - 1)) +
          (mask[0][1] * pixelAt(x, y - 1)) +
          (mask[0][2] * pixelAt(x + 1, y - 1)) +
          (mask[1][0] * pixelAt(x - 1, y)) +
          (mask[1][1] * pixelAt(x, y)) +
          (mask[1][2] * pixelAt(x + 1, y)) +
          (mask[2][0] * pixelAt(x - 1, y + 1)) +
          (mask[2][1] * pixelAt(x, y + 1)) +
          (mask[2][2] * pixelAt(x + 1, y + 1))
      );

      var pixelG = (
        (mask[0][0] * pixelAt(x - 1, y - 1,1)) +
        (mask[0][1] * pixelAt(x, y - 1,1)) +
        (mask[0][2] * pixelAt(x + 1, y - 1,1)) +
        (mask[1][0] * pixelAt(x - 1, y,1)) +
        (mask[1][1] * pixelAt(x, y,1)) +
        (mask[1][2] * pixelAt(x + 1, y,1)) +
        (mask[2][0] * pixelAt(x - 1, y + 1,1)) +
        (mask[2][1] * pixelAt(x, y + 1,1)) +
        (mask[2][2] * pixelAt(x + 1, y + 1,1))
    );

    var pixelB = (
      (mask[0][0] * pixelAt(x - 1, y - 1,2)) +
      (mask[0][1] * pixelAt(x, y - 1,2)) +
      (mask[0][2] * pixelAt(x + 1, y - 1,2)) +
      (mask[1][0] * pixelAt(x - 1, y,2)) +
      (mask[1][1] * pixelAt(x, y,2)) +
      (mask[1][2] * pixelAt(x + 1, y,2)) +
      (mask[2][0] * pixelAt(x - 1, y + 1,2)) +
      (mask[2][1] * pixelAt(x, y + 1,2)) +
      (mask[2][2] * pixelAt(x + 1, y + 1,2))
  );

      laplaceData.push(pixelR, pixelG, pixelB, 255);
    }
  }

  var clampedArray = laplaceData;

  if (typeof Uint8ClampedArray === 'function') {
    clampedArray = new Uint8ClampedArray(laplaceData);
  }

  clampedArray.toImageData = function() {
    return LaplaceHighlight.toImageData(clampedArray, width, height);
  };

  return clampedArray.toImageData();
}
LaplaceHighlight.toImageData = function toImageData(data, width, height) {
  if (typeof ImageData === 'function' && Object.prototype.toString.call(data) === '[object Array]') {
    return new ImageData(data, width, height);
  } else {
    if (typeof window === 'object' && typeof window.document === 'object') {
      var canvas = document.createElement('canvas');

      if (typeof canvas.getContext === 'function') {
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(width, height);
        imageData.data.set(data);
        return imageData;
      } else {
        return new FakeImageData(data, width, height);
      }
    } else {
      return new FakeImageData(data, width, height);
    }
  }
};
//////////////////////////////////////////////////////////////////////
const saltAndPepper = (imgData, rate) => {
  const data = imgData.data
  const area = imgData.height * imgData.width
  const total = Math.round(area * (rate/100))
  let count = 0
  let noise

  for(i = 0; i < data.length || count >= total; i+=4) {
      if(Math.random()*100 > rate) continue
      
      count++
      noise = Math.random()*255 < 127 ? 0 : 255

      data[i]   = noise
      data[i+1] = noise
      data[i+2] = noise
  }
  
  return imgData
}
//////////////////////////////////////////////////////////////////////
const Equalization = imgData => {
	const data = imgData.data
	const len = data.length
	const area = imgData.width * imgData.height

	const histograms = [
		getHistogram(data), 
		getHistogram(data, 1), 
		getHistogram(data, 2)
	]

	histograms.forEach(histo => {
		let acc = 0

		for(i = 0; i < 256; i++) {
			acc += histo[i]
			histo[i] = Math.max(0, Math.round((255*acc)/area - 1))
		}
	})

	for(i=0; i < len; i+=4) {
		data[i+0] = histograms[0][data[i+0]]
		data[i+1] = histograms[1][data[i+1]]
		data[i+2] = histograms[2][data[i+2]]
	}

	return imgData
}