// ==UserScript==
// @name         Anime Downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Chaelri
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?domain=livechart.me
// @grant        none
// ==/UserScript==

(function () {
    const URL_LOCATION_HREF = window.location.href
    console.log(URL_LOCATION_HREF)
    const URL_ANIME_LIST_VIEW = "livechart.me/"
    const URL_ANIME_ONLY_VIEW = "livechart.me/anime"
    const URL_ANIMEPAHE = "animepahe.com/"
    const URL_ANIMEPAHE_ANIME = "animepahe.com/anime"
    const URL_KWIK = "kwik.cx/"
    const URL_PAHE = "pahe.win/"
    const DOWNLOAD_ANIME_TEXT = "Download Anime"
    const DOWNLOAD_FROM_ANIMEPAHE = "Download from AnimePahe"
    const DOWNLOAD_FROM_ANIMIXPLAY = "Download from AniMixPlay"

    if(URL_LOCATION_HREF.includes(URL_ANIME_LIST_VIEW)){
        if(!URL_LOCATION_HREF.includes(URL_ANIME_ONLY_VIEW)){
            liveChartAnimeListView()
        } else{
            liveChartAnimeOnlyView()
        }
    } else if(URL_LOCATION_HREF.includes(URL_ANIMEPAHE)){
        if(!URL_LOCATION_HREF.includes(URL_ANIMEPAHE_ANIME)){
            animePaheClicker()
        } else {
            animePaheAnimeListView()
        }
    } else if(URL_LOCATION_HREF.includes(URL_PAHE)){
        paheClicker()
    } else if(URL_LOCATION_HREF.includes(URL_KWIK)){
        kwikClicker()
    }

    // =====================================================================================================================
    // LIVECHART.ME
    // =====================================================================================================================


    //FOR URL_ANIME_LIST_VIEW
    function liveChartAnimeListView(){
        let animeCard = document.getElementsByClassName("anime-card")
        for (let i = 0; i < animeCard.length; i++) {
            let downloadButton = createButton(DOWNLOAD_ANIME_TEXT, false);

            (function(i){
                downloadButton.addEventListener("click", function() {
                    window.open(
                        "https://animepahe.com/anime?searchFilter=" + animeCard[i].children[2].innerText
                    )
                })
            })(i)

            animeCard[i].appendChild(downloadButton)
        }
        addFilterElementsByTag()
        addFilterShorts()
        appendCustomCSS()

        function filterByTag(e) {
            let tag = e.target.value.toLowerCase()
            for (let i = 0; i < animeCard.length; i++) {
                animeCard[i].parentElement.style.display = "inline-block"
                if (!animeCard[i].children[3].innerText.toLowerCase().includes(tag)) {
                    animeCard[i].parentElement.style.display = "none"
                }
                if (animeCard[i].children[2].innerText.toLowerCase().includes(tag)) {
                    animeCard[i].parentElement.style.display = "inline-block"
                }
            }
        }

        function viewAll() {
            for (let i = 0; i < animeCard.length; i++) {
                animeCard[i].parentElement.style.display = "inline-block"
            }
        }

        function addFilterElementsByTag(){
            let tagInput = createSearchInput()
            let addLiTag = createLi()
            let addITag = createI()
            let loadingIcon = document.createElement("div")
            let clearButton = document.createElement("div")

            loadingIcon.id = "loadingIcon"
            loadingIcon.innerText = "•"
            loadingIcon.style.cssText = `
                                        width: 10px;
                                        height: 10px;
                                        position: relative;
                                        right: 15%;
                                        margin-top: 12px;
                                        opacity: 0;
                                        `

            clearButton.innerText = "ⓧ"
            clearButton.style.cssText = `
                                        margin-top: 6px;
                                        cursor: pointer;
                                        position: relative;
                                        right: 10%;
                                        display: none;
                                        `
            clearButton.onclick = function() {
                tagInput.value = ""
                tagInput.focus()
                viewAll()
                clearButton.style.display = "none"
            }

            tagInput.addEventListener("input", inputPressed)
            tagInput.addEventListener("keyup", enterPressed)

            addLiTag.style.display = "flex"
            addLiTag.appendChild(addITag)
            addLiTag.appendChild(tagInput)
            addLiTag.appendChild(loadingIcon)
            addLiTag.appendChild(clearButton)

            function inputPressed(e) {
                loadingIcon.style.opacity = 1
                setTimeout(function () {
                    loadingIcon.style.opacity = 0
                    filterByTag(e)
                }, 0)

                e.target.value != ""
                    ? (clearButton.style.display = "block")
                    : (clearButton.style.display = "none")
            }

            function enterPressed(e) {
                if (e.keyCode == 13) {
                    tagInput.blur()
                }
            }

            pageCleanUp()

            function pageCleanUp(){
                for (let i = 0; i < document.getElementsByClassName("ul-tabs")[0].childElementCount; i++) {
                    document.getElementsByClassName("ul-tabs")[0].children[i].style.display ="none"
                }
                document.getElementsByClassName("options-bar-v2 column")[0].style.display = "none"
                document.getElementsByClassName("ul-tabs")[0].appendChild(addLiTag)
                document.getElementsByClassName("ul-tabs")[0].style.display = "flex"
                document.getElementsByClassName("row")[0].style.display = "none"
            }
        }

        function addFilterShorts(){
            let addLiTagForShorts = createLi()
            let addLiTagForShortsButton = document.createElement("button")
            let addLiTagForReset = createLi()
            let addLiTagForResetButton = document.createElement("button")

            addLiTagForShortsButton.innerText = 'Shorts'
            addLiTagForShortsButton.addEventListener("click", function(){
                let animeEp = document.getElementsByClassName('anime-episodes')
                for (let i = 0; i < animeCard.length; i++) {
                    let animeEpInnerText = animeEp[i].innerText
                    let val = animeEpInnerText.includes('×') && animeEpInnerText.includes('min') && !animeEpInnerText.includes('hr') ? animeEpInnerText.substring(animeEpInnerText.indexOf('×') + 2, animeEpInnerText.indexOf('m') - 1)
                    : !animeEpInnerText.includes('hr') && animeEpInnerText.includes('min') ? animeEpInnerText.substring(0 ,animeEpInnerText.indexOf('m') - 1)
                    : ''
                    animeCard[i].parentElement.style.display = parseInt(val) < 10 ? "inline-block" : "none"
                }
            })
            addLiTagForShortsButton.style.cssText = `
                                                    background: black;
                                                    color: white;
                                                    padding: 10px;
                                                    border: 1px solid black;
                                                    ;`


            addLiTagForResetButton.innerText = 'Reset'
            addLiTagForResetButton.addEventListener("click", function(){
                viewAll()
            })
            addLiTagForResetButton.style.cssText = `
                                                    background: transparent;
                                                    color: black;
                                                    padding: 10px;
                                                    border: 1px solid black;
                                                    ;`

            addLiTagForShorts.appendChild(addLiTagForShortsButton)
            addLiTagForReset.appendChild(addLiTagForResetButton)
            document.getElementsByClassName("ul-tabs")[0].appendChild(addLiTagForShorts)
            document.getElementsByClassName("ul-tabs")[0].appendChild(addLiTagForReset)
        }
    }

    // FOR URL_ANIME_ONLY_VIEW
    function liveChartAnimeOnlyView(){
        try{
            let divWrapperTwo = document.createElement("div")
            let downloadButtonTwo = createButton(DOWNLOAD_FROM_ANIMEPAHE, true)
            let inputEpisodeTwo = document.createElement('input')

            divWrapperTwo.style.display = 'flex'

            inputEpisodeTwo.type = 'number'
            inputEpisodeTwo.className = 'input-episode'
            inputEpisodeTwo.value = 1

            downloadButtonTwo.onclick = function () {
                window.open(
                    "https://animepahe.com/anime?searchFilter=" +
                    document.getElementsByTagName("h4")[0].innerText.split("\n")[0] +
                    "&episodeNumber=" + inputEpisodeTwo.value
                )
            }

            divWrapperTwo.appendChild(downloadButtonTwo)
            divWrapperTwo.appendChild(inputEpisodeTwo)
            document.getElementsByTagName("h4")[0].appendChild(divWrapperTwo)
        }
        catch(e){
            //Mobile Version
            let divWrapperThree = document.createElement("div")
            let downloadButtonThree = createButton(DOWNLOAD_FROM_ANIMEPAHE, true)
            let inputEpisodeThree = document.createElement('input')

            divWrapperThree.style.display = 'flex'
            inputEpisodeThree.type = 'number'
            inputEpisodeThree.className = 'input-episode'
            inputEpisodeThree.value = 1

            downloadButtonThree.onclick = function () {
                window.open(
                    "https://animepahe.com/anime?searchFilter=" +
                    document.querySelectorAll('[class="column small-7"]')[0].children[1].innerText.split("\n")[0] +
                    "&episodeNumber=" + inputEpisodeThree.value
                )
            }

            divWrapperThree.appendChild(downloadButtonThree)
            divWrapperThree.appendChild(inputEpisodeThree)
            document.querySelectorAll('[class="column small-7"]')[0].children[2].appendChild(divWrapperThree)
        }
        appendCustomCSS()
    }

    function createButton(buttonName, fromAnimeOnly){
        let button = document.createElement("button")
        button.type = "submit"
        button.style.cssText =  fromAnimeOnly ? `
                                                background-color: #3B97FC;
                                                color: white;
                                                padding: 10px;
                                                cursor: pointer;
                                                width: fit-content;
                                                margin: 15px 0px;
                                                font-family: Arial;
                                                `
                                              : `background-color: #3B97FC;
                                                color: white;
                                                padding: 10px;
                                                cursor: pointer;
                                                font-weight: bold;
                                                width: 100%;
                                                font-family: Arial;
                                                `
        button.innerText = buttonName
        button.className = "green-hover"
        return button
    }

    function createSearchInput(){
        let input = document.createElement("input")
        input.type = "text"
        input.placeholder = "Filter Anime..."
        input.style.cssText = `
                                max-width: 320px;
                                outline: none;
                                border: none;
                                background-color: transparent;
                                box-shadow: none;
                                border-bottom: 1px solid black;
                              `
        return input
    }

    function createLi(){
        let li = document.createElement("li")
        return li
    }

    function createI(){
        let i = document.createElement("i")
        i.className = "icon-search"
        i.style.marginTop = "6px"
        return i
    }

    function appendCustomCSS(){
        let css = `.green-hover:hover{
                        background-color: green !important
                    }
                    #loadingIcon{
                        color: #3B97FC;
                        animation: loadingIconAnim 0.5s infinite;
                    }
                    @keyframes loadingIconAnim {
                        50% {color: green;}
                        100% {color: #3B97FC; transform: rotate(360deg);}
                    }
                    .input-episode::-webkit-outer-spin-button, .input-episode::-webkit-inner-spin-button{
                        -webkit-appearance: none;
                    }
                    .input-episode{
                        color: black;
                        margin-top: 15px;
                        margin-bottom: 15px;
                        cursor: pointer;
                        width: 100%;
                        font-weight: bold;
                        font-size: 1rem;
                        max-width: 35px;
                        height: auto;
                        text-align: center;
                        border: 0px;
                    }
                    .input-episode.main{
                        margin: 0;
                    }
                `;
        let style = document.createElement("style")
        style.innerText = css
        document.getElementsByTagName("head")[0].appendChild(style)
    }


    // =====================================================================================================================
    // ANIMEPAHE
    // =====================================================================================================================


    function animePaheAnimeListView(){
        console.log(URL_LOCATION_HREF)
        if(URL_LOCATION_HREF.includes('?searchFilter=')){
            var animeTitle = new URL(window.location.href).searchParams.get('searchFilter');
            var tabList = document.querySelectorAll('[role="tablist"]')[0];
            var startingEpisode = new URL(window.location.href).searchParams.get('episodeNumber');

            if(!Number.isNaN(parseInt(animeTitle.charAt(0)))){
                tabList.children[0].children[0].click();
            } else{
                for(var i = 0; i < tabList.childElementCount; i++){
                    if(tabList.children[i].innerText == animeTitle.charAt(0).toUpperCase()){
                        tabList.children[i].children[0].click();
                        break;
                    }
                }
            }

            var animeList = !Number.isNaN(parseInt(animeTitle.charAt(0).toUpperCase())) ? document.getElementById('hash') : document.getElementById(animeTitle.charAt(0).toUpperCase());

            var isAnimeFound = false;
            setTimeout(function() {
                for(var j = 0; j < animeList.children[0].childElementCount; j++){
                    if(animeList.children[0].children[j].innerText.toLowerCase().replaceAll(/\s/g,'').replaceAll('…','...') == animeTitle.toLowerCase().replaceAll(/\s/g,'').replaceAll('…','...')){
                        window.open(animeList.children[0].children[j].children[0].href + '?episodeNumber=' + startingEpisode, '_self');
                        isAnimeFound = true;
                    }
                }
                if(!isAnimeFound){
                    alert(animeTitle + ' not found.');
                }
            }, 1000);
        } else {
            var startingEpisodeTwo = new URL(window.location.href).searchParams.get('episodeNumber');
            setTimeout(function() {
                document.getElementsByClassName('btn-group btn-group-toggle')[0].children[0].click();
                setTimeout(function() {
                    try{
                        var animeFrame = document.getElementsByClassName('episode-list row')[0].children[startingEpisodeTwo-1].children[0].children[0];
                        animeFrame.children[animeFrame.childElementCount - 1].click();
                    }
                    catch(e){
                        var animeFrameTwo = document.getElementsByClassName('episode-list row')[0].children[0].children[0].children[0];
                        animeFrameTwo.children[animeFrameTwo.childElementCount - 1].click();
                    }

                }, 1000);
            }, 1000);
        }
    }

    function animePaheClicker(){
        setTimeout(function() {
            var id = document.getElementById("pickDownload");
            var openDownloadAnime = window.open(id.children[id.childElementCount-1]);
            setTimeout(function() {
                //openDownloadAnime.close();
                var id = document.getElementsByClassName("clusterize-scroll");
                for (var counter = 0; counter < id[0].children.length; counter++) {
                    if (window.location.href == id[0].children[counter].href) {
                        var getCurrentEpisode = counter;
                    }
                }
                try {
                    window.location.href = id[0].children[getCurrentEpisode + 1].href;
                } catch (err) {
                alert('Last episode reached!');
                }
            }, 20000);
        }, 2000);
    }


    // =====================================================================================================================
    // PAHE
    // =====================================================================================================================


    function paheClicker() {
        let checkIfContinueExist = setInterval(() => {
            if (document.getElementsByClassName('col-sm-6')[0].innerText == "Continue") {
                document.getElementsByClassName('col-sm-6')[0].children[0].click()
                clearInterval(checkIfContinueExist)
            }
        }, 100)
    }


    // =====================================================================================================================
    // KWIK.CX
    // =====================================================================================================================



    function kwikClicker(){
        setTimeout(function() {
            if(document.title != 'Please Wait... | Cloudflare'){
                clickDownloadButton(16);
            } else {
                console.log('Manual Capcha');
            }
        }, 2000);

        function clickDownloadButton(counter){
            console.log('start?');
            var start = document.querySelector("[data-translate='challenge_headline']");
            if (start == null) {

                var id = null;
                var idChecker = setInterval(function() {
                    id = document.getElementsByClassName("button is-uppercase is-success is-fullwidth");
                    id[0].click();
                    var id2 = document.getElementsByClassName("title");
                    id2[0].innerText = id2[0].innerText.replace('AnimePahe_', '');
                    id2[0].innerText = id2[0].innerText.replace(/_/g, ' ');
                    id2[0].style.fontWeight = "100";
                    id2[0].style.textAlign = "center";
                    document.title = id2[0].innerText;
                    if (id != null) {
                        clearInterval(idChecker);
                    }
                }, 100);


                //Make clean
                setTimeout(function() {
                    var adSense2 = document.getElementsByTagName('iframe');
                    adSense2[adSense2.length - 1].remove();
                    var i1 = document.getElementsByTagName('nav');
                    i1[0].remove();
                    var i2 = document.getElementsByClassName('column is-12');
                    while (i2.length != 0) {
                        i2[i2.length - 1].remove();
                    }
                    var i3 = document.getElementsByClassName('column is-9');
                    while (i3.length != 0) {
                        i3[i3.length - 1].remove();
                    }
                    var i4 = document.getElementsByTagName('footer');
                    i4[0].remove();
                    var i5 = document.getElementsByTagName('script');
                    while (i5.length != 0) {
                        i5[i5.length - 1].remove();
                    }

                }, 1000);

                //Remove Ads
                setTimeout(function() {
                    var adSense2 = document.getElementsByTagName('iframe');
                    adSense2[adSense2.length - 1].remove();
                }, 5000);

                var body = document.getElementsByTagName('body');

                setTimeout(function() {
                    if (id == null) {
                        body[0].style.backgroundColor = 'red';
                    } else {
                        id[0].style.cssText = `
                                        margin: auto;
                                        width: 150px;
                                        height: 150px;
                                        border-radius: 32px;
                                        border: none;
                                        font-size: 4rem;
                                    `;
                        document.getElementsByClassName('column is-3')[0].style.width = "100%";

                        id[0].innerHTML = counter;

                        var setCounter = setInterval(function(){
                            if(counter > 0){
                                counter -= 1;
                                id[0].innerHTML = counter;
                            } else {
                                clearInterval(setCounter);
                            }
                        }, 1000);

                        id[0].children[0].style.display = "none";
                    }
                }, 1000);
            }
        }
    }
  })();