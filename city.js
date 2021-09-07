imagesJSON = localStorage.getItem('images')
images = JSON.parse(imagesJSON)


function calculateLevel() {
    exp = parseFloat(localStorage.getItem('exp'))
    level = Math.floor(Math.sqrt(exp))
    document.getElementsByClassName('level')[0].textContent = "Level: " + level
}

calculateLevel()

current = 0

for (i = 0; i < images.length; i++) {
    for (x = 0; x < images[i][4]; x++) {
        number = Math.floor(Math.floor(Math.random() * 4 + Math.floor(current / 4)))

        while (!(document.getElementsByClassName('building')[current + number].src).includes('blank.png')) {
            number = Math.floor(Math.floor(Math.random() * 4 + Math.floor(current)))
            /*
            if ((document.getElementsByClassName('building')[current + number - 1].src).includes('blank.png')) {
                document.getElementsByClassName('building')[current + 5].src = "./extra images/" +  Math.floor(Math.random() * 31) + ".png"
            }
            */
        }

        document.getElementsByClassName('building')[current + number].src = "images/" + images[i][0] + ".png"
        current++
    }

}

for (i = 0; i < document.getElementsByClassName('building').length; i++) {
    if ((document.getElementsByClassName('building')[i].src).includes('blank.png')) {
        document.getElementsByClassName('building')[i].src = "./extra images/" +  Math.floor(Math.random() * 45) + ".png"
    }
}