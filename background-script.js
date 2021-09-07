var buildingNotification = "building-notification"
var buildingCancelNotification = "building-cancel-notification"
blockedWebsites = ["youtube.com", "facebook.com", "instagram.com", "twitter.com", "netflix.com", "myspace.com", "reddit.com", "amazon.com", "hulu.com", "twitch.tv", "disneyplus.com", "vimeo.com", "dailymotion.com", "crunchyroll.com", "fmovies.to", "hbomax.com", "linkedin.com", "discord.com", "pinterest.com", "tiktok.com", "tumblr.com", "amazon.com", "amazon.ca", "ebay.com", "walmart.com", "etsy.com", "target.com", "costco.com", "bestbuy.com", "newegg.com", "wish.com", "wayfair.com", "tinder.com", "match.com", "pof.com", "okcupid.com", "zoosk.com", "bumble.com", "seeking.com", "happn.com", "cs-online.club", "worldofsolitaire.com", "pogo.com", "miniclip.com", "addictinggames.com", "yahoo.com", "msn.com", "nytimes.com", "foxnews.com", "huffingtonpost.com", "buzzfeed.com", "vice.com", "cnn.com", "omegle.com", "tinychat.com", "chatroulette.com", "chatrandom.com", "bovada.lv", "betonline.ag", "lotterypost.com", "bet365.com", "flalottery.com", "asatlantis.com", "pornhub.com", "xvideos.com", "xnxx.com"]
buiding = false

checkBuildingProgress()
reportPage()

async function reportPage() {
    items = await browser.tabs.query({currentWindow: true})
    for (i = items.length; i != 0; i--) {
        for (x = blockedWebsites.length; x != 0; x--) {
            if((items[i - 1].url).includes(blockedWebsites[x - 1])) {
                if (buiding) {
                    browser.notifications.create(buildingCancelNotification, {
                        "type": "basic",
                        "title": "Oh No...",
                        "message": "Your Building Construction Failed."
                    })

                    localStorage.setItem('notification', 'c')
                    localStorage.setItem('started', false)
                    localStorage.setItem('building', false)
                }
            }
        }
    }
    setTimeout(() => {
        reportPage()
    }, 1000)
}

function checkBuildingProgress() {
    setTimeout(() => {
        if (!(localStorage.getItem('notification') === null)) {
            if (localStorage.getItem('notification') == 'c') {
                clearTimeout(notificationTimeout)
                buiding = false
            } else {
                buiding = true
                notificationTimeout = setTimeout(() => {
                    browser.notifications.create(buildingNotification, {
                        "type": "basic",
                        //"iconUrl": browser.runtime.getURL("images/Campsite.png"), Change
                        "title": "Well Done!",
                        "message": "A New Building Has Been Built."
                    })
                    buiding = false
                    setTimeout(() => {
                        browser.notifications.clear(buildingNotification)
                    }, 10000)
                }, localStorage.getItem('notification') * 1000 * 60)
            }
            localStorage.removeItem('notification')
        }
        checkBuildingProgress()
    }, 1000)
}

function calculateLevel(expe) {
    level = Math.sqrt(expe).toFixed(2)
}