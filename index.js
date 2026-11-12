const imageTop = new Image()
imageTop.src = './images/top.png'
imageTop.height = 224

const imageMiddle = new Image()
imageMiddle.src = './images/middle.png'
imageMiddle.height = 226

const imageBottom = new Image()
imageBottom.src = './images/bottom.png'
imageBottom.height = 492

const imgPath = './images/clothes/'

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

function drawTheImage(image, x, y) {
  ctx.drawImage(image, x, y, 464, image.height)
}
//-------------EVENT LISTENERS------------------------
document.addEventListener('click', (e) => {
  handleClick(e)
})
function beginGame() {
  // Wait until all three images have loaded
  Promise.all([imageTop.decode(), imageMiddle.decode(), imageBottom.decode()])
    .then(() => {
      drawTheImage(imageTop, 0, 0)

      drawTheImage(imageMiddle, 0, imageTop.height)

      drawTheImage(imageBottom, 0, imageTop.height + imageMiddle.height - 13)
    })
    .catch((error) => {
      console.log('Image loading failed:', error)
    })
}
beginGame()

let hats = [imgPath + 'top1.png', imgPath + 'top2.png', imgPath + 'top3.png']
let mids = [imgPath + 'mid1.png', imgPath + 'mid2.png', imgPath + 'mid3.png']
let bots = [imgPath + 'bot1.png', imgPath + 'bot2.png', imgPath + 'bot3.png']

function handleClick(e) {
  const direction = e.target.id

  let img = new Image()
  let move = ''
  switch (direction) {
    case 'topLeft':
      img.src = hats[0]
      Promise.all([img.decode()])
        .then(() => {
          ctx.clearRect(0, 0, 464, img.height)
          drawTheImage(img, 0, 0)
          changeImageLeft(img, hats)
          // changeImageLeft(img, hats)
        })
        .catch((error) => {
          console.log('Image loading failed:', error)
        })
      break

    case 'midLeft':
      img.src = mids[0]
      Promise.all([img.decode()])
        .then(() => {
          ctx.clearRect(0, 0, 464, img.height)
          ctx.clearRect(0, 0, 464, 0)
          drawTheImage(imageTop, 0, 0)
          drawTheImage(img, 0, imageTop.height)
          changeImageLeft(img, mids)
        })
        .catch((error) => {
          console.log('Image loading failed:', error)
        })
      break

    case 'bottomLeft':
      img.src = bots[0]
      Promise.all([img.decode()])
        .then(() => {
          changeImageLeft(img, bots)
        })
        .catch((error) => {
          console.log('Image loading failed:', error)
        })
      break

    case 'topRight':
      img.src = hats[0]
      Promise.all([img.decode()])
        .then(() => {
          changeImageRight(img, hats)
        })
        .catch((error) => {
          console.log('Image loading failed:', error)
        })
      break

    case 'midRight':
      img.src = bots[0]
      Promise.all([img.decode()])
        .then(() => {
          changeImageRight(img, mids)
        })
        .catch((error) => {
          console.log('Image loading failed:', error)
        })
      break

    case 'bottomRight':
      img.src = bots[0]
      Promise.all([img.decode()])
        .then(() => {
          changeImageRight(img, bots)
        })
        .catch((error) => {
          console.log('Image loading failed:', error)
        })
      break

    case 'restartBtn':
      resetDoll()
      break

    default:
      console.log('Unknown direction')
  }
}

function changeImageLeft(img, clothingArray) {
  console.log(clothingArray, 'inside method')

  let y = 0

  if (clothingArray[0].includes('top')) {
    y = 0
  } else if (clothingArray[0].includes('mid')) {
    y = 224
  } else {
    y = 450
  }

  // // ctx.clearRect(0, y, 464, img.height)
  // // drawTheImage(img, 0, y)

  // console.log(img.height)
  // drawTheImage(imageTop, 0, 0)
  // drawTheImage(img, 0, y)

  //removes the first element
  let move = clothingArray.shift()
  //adds it to the end
  clothingArray.push(move)
  console.log(clothingArray, 'inside method')
  return
}

function changeImageRight(img, clothingArray) {
  console.log(clothingArray, 'inside method')
  if (clothingArray[0].includes('top')) {
    img.height = 224
  } else if (clothingArray[0].includes('mid')) {
    img.height = 226
  } else {
    img.height = 492
  }

  ctx.clearRect(0, 0, 464, img.height)
  drawTheImage(img, 0, 0)

  //removes the first element
  //adds it to the end
  let move = clothingArray.pop()
  clothingArray.unshift(move)

  console.log(clothingArray, 'inside method')
  return
}

function resetDoll() {
  console.log('Resetting doll')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  beginGame()
}
