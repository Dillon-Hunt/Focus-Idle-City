if (localStorage.getItem('images') === null) {
    localStorage.setItem('images', JSON.stringify([["Campsite", "15:00", true, 15, 0, 0], ["Trailer Park", "30:00", true, 30, 0, 0], ["Small House", "45:00", false, 45, 0, 1000], ["Cabin", "1:00:00", false, 60, 0, 5000], ["Corner Shop", "1:15:00", false, 75, 0, 20000], ["Petrol Station", "1:30:00", false, 90, 0, 50000], ["House", "1:45:00", false, 105, 0, 100000], ["Shop", "2:00:00", false, 120, 0, 250000], ["Museum", "2:15:00", false, 135, 0, 500000], ["Apartment Block", "2:30:00", false, 150, 0, 1000000], ["Military Hanger", "2:45:00", false, 165, 0, 5000000], ["Skyscraper", "3:00:00", false, 180, 0, 20000000], ["Castle", "3:15:00", false, 195, 0, 50000000]]))
}

if (localStorage.getItem('cash') === null) {
    localStorage.setItem('cash', 0)
}

if (localStorage.getItem('exp') === null) {
    localStorage.setItem('exp', 0)
}

if (localStorage.getItem('stats') === null) {
    localStorage.setItem('stats', JSON.stringify([["Buildings", 0], ["Minutes Foucused", 0], ["Coins/h", 0]]))
}

imagesJSON = localStorage.getItem('images')
images = JSON.parse(imagesJSON)


statsJSON = localStorage.getItem('stats')
stats = JSON.parse(statsJSON)

stats[2][1] = 0

for (i = 0; i < images.length; i++) {
    stats[2][1] += Math.floor(images[i][3] * 2 * images[i][4])
}

localStorage.setItem('stats', JSON.stringify(stats))

cash = localStorage.getItem('cash')

function calculateLevel() {
    exp = parseFloat(localStorage.getItem('exp'))
    level = Math.floor(Math.sqrt(exp))
    document.getElementsByClassName('level')[0].textContent = "Level: " + level
}

calculateLevel()

currentImage = 0
currentBuilding = ""
currentBuildingIndex = 0

timeOpened = new Date()

if (localStorage.getItem('timeOpened') === null) {
    localStorage.setItem('timeOpened', timeOpened)
} else {
    checkMoney()
}

function checkMoney() {
    timeLastOpened = localStorage.getItem('timeOpened')
    const diference = Date.parse(timeOpened) - Date.parse(timeLastOpened);
    const diferenceSeconds = Math.floor( (diference/1000));
    moneyPerHour = 0
    for (let i = 0; i < images.length; i++) {
        moneyPerHour += images[i][3] * images[i][4] * i
    }
    newMoney = Math.floor( moneyPerHour / 60 / 60 * diferenceSeconds )
    oldMoney = parseInt(localStorage.getItem('cash'))
    totalMoney = oldMoney + newMoney
    localStorage.setItem('cash', totalMoney)
    localStorage.setItem('timeOpened', timeOpened)
}

document.getElementsByClassName('house-previous')[0].onclick = () => {
    if (currentImage > 0) {
        currentImage--
    } else {
        currentImage = images.length - 1
    }
    updateImages()
}

document.getElementsByClassName('house-next')[0].onclick = () => {
    if (currentImage < (images.length - 1)) {
        currentImage++
    } else {
        currentImage = 0
    }
    updateImages()
}

document.getElementsByClassName('start-time')[0].onclick = () => {
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + images[currentImage][3] * 60 * 1000);
    currentBuilding = images[currentImage][0]
    currentBuildingIndex = currentImage
    localStorage.setItem('currentBuildingIndex', currentBuildingIndex)
    if (!building) {
        if (images[currentImage][2]) {
            localStorage.setItem('notification', images[currentImage][3])
            startTimer(deadline)
        } else {
            checkMoney()
            price = images[currentImage][5]
            if (cash < price) {
                document.getElementsByClassName('start-time')[0].textContent = "Need More Money"
            } else {
                images[currentImage][2] = true
                cash -= price
                localStorage.setItem('cash', cash)
                localStorage.setItem('images', JSON.stringify(images))
                updateImages()
            }
        }
    } else {
        localStorage.setItem('notification', 'c')
        startTimer(deadline)
    }
}

function updateImages() {
    if (currentImage - 1 == -1) {
        if (!(images[images.length - 1][2])) {
            document.getElementsByClassName('house-previous')[0].style.opacity = 0.5
            document.getElementsByClassName('house-previous')[0].style.filter = "grayscale(1)"
        } else {
            document.getElementsByClassName('house-previous')[0].style.opacity = 1
            document.getElementsByClassName('house-previous')[0].style.filter = "grayscale(0)"
        }

        document.getElementsByClassName('house-previous')[0].src = "images/" + images[images.length - 1][0] + ".png"
    } else {
        if (!(images[currentImage - 1][2])) {
            document.getElementsByClassName('house-previous')[0].style.opacity = 0.5
            document.getElementsByClassName('house-previous')[0].style.filter = "grayscale(1)"
        } else {
            document.getElementsByClassName('house-previous')[0].style.opacity = 1
            document.getElementsByClassName('house-previous')[0].style.filter = "grayscale(0)"
        }

        document.getElementsByClassName('house-previous')[0].src = "images/" + images[currentImage - 1][0] + ".png"
    }

    if (!(images[currentImage][2])) {
        document.getElementsByClassName('house-selected')[0].style.opacity = 0.5
        document.getElementsByClassName('house-selected')[0].style.filter = "grayscale(1)"
        if (!building) {
            document.getElementsByClassName('time')[0].textContent = "???"
            document.getElementsByClassName('start-time')[0].textContent = "UNLOCK - $" + images[currentImage][5]
            document.getElementsByClassName('house-name')[0].textContent = "???"
        } else {
            document.getElementsByClassName('house-name')[0].textContent = images[currentBuildingIndex][0]
        }
    } else {
        document.getElementsByClassName('house-selected')[0].style.opacity = 1
        document.getElementsByClassName('house-selected')[0].style.filter = "grayscale(0)"
        if (!building) {
            document.getElementsByClassName('time')[0].textContent = images[currentImage][1]
            document.getElementsByClassName('start-time')[0].textContent = "BUILD"
            document.getElementsByClassName('house-name')[0].textContent = images[currentImage][0]
        } else {
            document.getElementsByClassName('house-name')[0].textContent = images[currentBuildingIndex][0]
        }
    }

    document.getElementsByClassName('house-selected')[0].src = "images/" + images[currentImage][0] + ".png"

    if (currentImage + 1 == images.length) {
        if (!(images[0][2])) {
            document.getElementsByClassName('house-next')[0].style.opacity = 0.5
            document.getElementsByClassName('house-next')[0].style.filter = "grayscale(1)"
        } else {
            document.getElementsByClassName('house-next')[0].style.opacity = 1
            document.getElementsByClassName('house-next')[0].style.filter = "grayscale(0)"
        }

        document.getElementsByClassName('house-next')[0].src = "images/" + images[0][0] + ".png"
    } else {
        if (!(images[currentImage + 1][2])) {
            document.getElementsByClassName('house-next')[0].style.opacity = 0.5
            document.getElementsByClassName('house-next')[0].style.filter = "grayscale(1)"
        } else {
            document.getElementsByClassName('house-next')[0].style.opacity = 1
            document.getElementsByClassName('house-next')[0].style.filter = "grayscale(0)"
        }

        document.getElementsByClassName('house-next')[0].src = "images/" + images[currentImage + 1][0] + ".png"
    }
}

if (localStorage.getItem('started') === undefined) {
    localStorage.setItem('started', false)
} 

if (localStorage.getItem('building') === undefined) {
    localStorage.setItem('building', false)
} 

if (localStorage.getItem('started') == "true") {
    started = true
} else {
    started = false
}

if (localStorage.getItem('building') == "true") {
    building = true
    currentBuildingIndex = localStorage.getItem('currentBuildingIndex')
    currentBuilding = images[currentBuildingIndex][0]
} else {
    building = false
}

forceStarted = false

if (started) {
    forceStarted = true
    startTimer(localStorage.getItem('deadline'))
} else {
    document.getElementsByClassName('time')[0].textContent = images[currentImage][1]
}

function startTimer(deadline) {
    localStorage.setItem('deadline', deadline)
    if (building && !forceStarted) {
        forceStarted = false
        building = false
        started = false
        document.getElementsByClassName('start-time')[0].textContent = "BUILD"
    } else {
        forceStarted = false
        building = true
        started = true
        document.getElementsByClassName('start-time')[0].textContent = "STOP"
    }
    localStorage.setItem('building', building)
    localStorage.setItem('started', started)

    const timeinterval = setInterval(() => {
        const time = getTimeRemaining(deadline);

        if (time.hours > 0) {
            if (time.seconds < 10 && time.minutes < 10) {
                document.getElementsByClassName('time')[0].textContent = time.hours + ":" + "0" + time.minutes + ":" + "0" + time.seconds
            } else if (time.minutes < 10){ 
                document.getElementsByClassName('time')[0].textContent = time.hours + ":" + "0" + time.minutes + ":" + time.seconds
            } else if (time.seconds < 10) {
                document.getElementsByClassName('time')[0].textContent = time.hours + ":" + time.minutes + ":" + "0" + time.seconds
            } else {
                document.getElementsByClassName('time')[0].textContent = time.hours + ":" + time.minutes + ":" + time.seconds
            }
        } else if (time.minutes > 0) {
            if (time.seconds < 10) {
                document.getElementsByClassName('time')[0].textContent = time.minutes + ":" + "0" + time.seconds
            } else {
                document.getElementsByClassName('time')[0].textContent = time.minutes + ":" + time.seconds
            }
        } else if (time.seconds > 0) {
            document.getElementsByClassName('time')[0].textContent = time.seconds
        } else {
            clearInterval(timeinterval);
            started = false
            building = false
            localStorage.setItem('started', started)
            localStorage.setItem('building', building)
            images[currentBuildingIndex][4]++
            localStorage.setItem('images', JSON.stringify(images))
            checkMoney()
            oldExp = parseFloat(localStorage.getItem('exp'))
            newExp = oldExp + currentBuildingIndex * (currentBuildingIndex / 2)
            localStorage.setItem('exp', newExp)
            calculateLevel()
            stats[0][1]++
            stats[1][1] += images[currentBuildingIndex][3]
            localStorage.setItem('stats', JSON.stringify(stats))
        }

        if (!building) {
            clearInterval(timeinterval);
            started = false
            building = false
            localStorage.setItem('started', started)
            localStorage.setItem('started', started)
            document.getElementsByClassName('time')[0].textContent = images[currentImage][1]
            document.getElementsByClassName('start-time')[0].textContent = "BUILD"
            updateImages()
        }
      },1000);
}

function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  




updateImages()