const bindPixelAt = (data, width) => {
    return (x, y, i) => {
      i = i || 0;
      return data[((width * y) + x) * 4 + i];
    }
}