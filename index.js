const imageTop = new Image()
imageTop.src = './images/top.png'
imageTop.height = 224

const imageMiddle = new Image()
imageMiddle.src = './images/middle.png'
imageMiddle.height = 226

const imageBottom = new Image()
imageBottom.src = './images/bottom.png'
imageBottom.height = 492

function drawImage(image, x, y) {
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, x, y, 464, image.height)
}

drawImage(imageTop, 0, 0)
