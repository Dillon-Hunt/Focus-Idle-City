function calculateLevel() {
    exp = parseFloat(localStorage.getItem('exp'))
    level = Math.floor(Math.sqrt(exp))
    document.getElementsByClassName('level')[0].textContent = "Level: " + level
}

calculateLevel()

document.getElementsByClassName('reset-button')[0].addEventListener('click', () => {
    localStorage.clear()
    window.close()
})

statsJSON = localStorage.getItem('stats')
stats = JSON.parse(statsJSON)

document.getElementsByClassName('stat')[0].textContent = stats[0][0] + ": " + stats[0][1]
document.getElementsByClassName('stat')[1].textContent = stats[1][0] + ": " + stats[1][1]
document.getElementsByClassName('stat')[2].textContent = stats[2][0] + ": " + stats[2][1]