imagesJSON = localStorage.getItem('images')
images = JSON.parse(imagesJSON)

cash = localStorage.getItem('cash')

function calculateLevel() {
    exp = parseFloat(localStorage.getItem('exp'))
    level = Math.floor(Math.sqrt(exp))
    document.getElementsByClassName('level')[0].textContent = "Level: " + level
}

calculateLevel()

document.getElementsByClassName('cash')[0].textContent = "$" + cash

for (i = 0; i < document.getElementsByClassName('building-count').length; i++) {
    document.getElementsByClassName('building-count')[i].textContent = "x" + images[i][4]
    if (!images[i][2]) {
        document.getElementsByClassName('building-image')[i].style.filter = "grayscale(1)"
        document.getElementsByClassName('building-production')[i].textContent = "???/hr"
    } else {
        document.getElementsByClassName('building-image')[i].style.filter = "grayscale(0)"
        document.getElementsByClassName('building-production')[i].textContent = "$" + Math.floor(images[i][3] * 2 * images[i][4]) + "/hr"
    }

}