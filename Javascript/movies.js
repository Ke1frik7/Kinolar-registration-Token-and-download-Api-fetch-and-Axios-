    const parent_select = renderElement(".parent__select")
    let parent = renderElement(".hero__cards")
    let template = elementId("card_template").content
    let header = renderElement("header")
    let form = renderElement("form")
    let locals_btn = renderElement(".locals__btn")
    let KEY = "c387ab8c"
    let SEARCH = "man"
    const scrolHeader = () => {
        header.classList.toggle("activeHeader", scrollY > 0)
    }
    window.addEventListener("scroll", scrolHeader)
    let locals = renderElement(".locals__align")
    const handleLocals = () => {
        locals.classList.toggle("active")
    }
    locals_btn.addEventListener("click", handleLocals)
    const renders = (arr) => {
        parent.innerHTML = null
        console.log(arr)
        for(let i = 0; i<arr.length; i++){
            let clone = template.cloneNode(true)
            let card = clone.querySelector(".card")
            card.addEventListener("click", handleCardClick)
            let img = clone.querySelector(".card__img_top")
            img.src = arr[i].Poster
            let name = clone.querySelector(".card__title")
            name.textContent = arr[i].Title
            let text = clone.querySelector(".card__text")
            text.textContent = `Bu kino ${arr[i].Title} haqida va juda ko'p tomoshabinlar olqishiga sazovor bo'lgan`
            let button = clone.querySelector(".card__btn")
            button.dataset.id = arr[i].imdbID
            parent.appendChild(clone)
        }
    }
    let arrayKino;
    let page = 1
    ;(async function(){
        let fetching = await fetch(`https://www.omdbapi.com/?&apikey=${KEY}&s=${SEARCH}&&page=${page}`, {
            method: "GET",
        })
        let response = await fetching.json()
        arrayKino = response.Search
        renders(response.Search)
    }())
    form.addEventListener("submit", handleSub)
    let input = renderElement(".input")
    let objectSort = {
        az: function(a,b){
            if(a.Title <  b.Title){
                return -1
            }else{
                return 1
            }
        },
        za: function(a,b){
            if(a.Title>b.Title){
                return 1
            }else{
                return -1
            }
        },
        rating: function(a,b){
            if(a.Year < b.Year){
                return -1
            }else{
                return 1
            }
        }
    }
    let select_sort = elementId("select__sort")
    function handleSub(event){
        event.preventDefault()
        console.log(arrayKino)
        let filtred = []
        let inputValue = input.value
        let rejex = new RegExp(inputValue, "gi")
        if(inputValue == "all"){
            filtred = arrayKino
        }else if(inputValue !== "all"){
            filtred = arrayKino.filter((item) => item.Title.match(rejex))
        }
        if(select_sort.value == "all"){
            filtred = arrayKino
        }else if(select_sort !== "all"){
            filtred = arrayKino.sort(objectSort[select_sort.value])
        }
        renders(filtred)
    }
    let expert;
    const handleChange = (event) => {
        let value = event.target.value
        if(value === "jangari" ){
             expert = axios({
                method: "GET",
                url: `https://www.omdbapi.com/?&apikey=c387ab8c&s=fight&&page=${page} `
            })
            expert.then((response) => {
                arrayKino = response.data.Search
                renders(response.data.Search)
            })
            
        }else if(value ===  "muhabbat"){
             expert = axios({
                method: "GET",
                url: "https://www.omdbapi.com/?&apikey=c387ab8c&s=love"
            })
            expert.then((response) => {
                arrayKino = response.data.Search
                renders(response.data.Search)
            })
        }else if(value === "tragediya"){
             expert = axios({
                method: "GET",
                url: "https://www.omdbapi.com/?&apikey=c387ab8c&s=tragedies"
            })
            expert.then((response) => {
                arrayKino = response.data.Search
                renders(response.data.Search)
            })
        }else if(value == "comediya"){
             expert = axios({
                method: "GET",
                url: "https://www.omdbapi.com/?&apikey=c387ab8c&s=komedia"
            })
            expert.then((response) => {
                arrayKino = response.data.Search
                renders(response.data.Search)
            })
        }else if(value === "fantastika"){
             expert = axios({
                method: "GET",
                url: "https://www.omdbapi.com/?&apikey=c387ab8c&s=fantastic"
            })
            expert.then((response) => {
                arrayKino = response.data.Search
                renders(response.data.Search)
            })
        }else if(value == "drama"){
             expert = axios({
                method: "GET",
                url: "https://www.omdbapi.com/?&apikey=c387ab8c&s=drama"
            })
            expert.then((response) => {
                arrayKino = response.data.Search
                renders(response.data.Search)
            })
        }
        
    }
    parent_select.addEventListener("change", handleChange)
    let right = renderElement(".right")
    function handleRight(){
        page++
       ;(async function(){
        let fetching = await fetch(`https://www.omdbapi.com/?&apikey=${KEY}&s=${SEARCH}&&page=${page}`, {
            method: "GET",
        })
        let response = await fetching.json()
        arrayKino = response.Search
        renders(response.Search)
    }())
    expert.then((response) => {
        return console.log(response.data.Search)
    })
    }
    right.addEventListener("click", handleRight)
    let left = renderElement(".left")
    const handleLeft = () => {      
        if(page > 1){
            page--
            ;(async function(){
                let fetching = await fetch(`https://www.omdbapi.com/?&apikey=${KEY}&s=${SEARCH}&&page=${page}`, {
                    method: "GET",
                })
                let response = await fetching.json()
                arrayKino = response.Search
                renders(response.Search)
            }())
        }else{
            console.log(false)
        }
    }
    left.addEventListener("click", handleLeft)
    let arrayLocals = []
    let parses;
    let objectLocals ={
        Title: null,
        Poster: null
    }
    let allsLocals = []
    function handleCardClick(event){
        if(event.target.closest(".card__btn")){
            let data_id = event.target.dataset.id
            for(let i = 0; i<arrayKino.length; i++){
                if(arrayKino[i].imdbID ==data_id){
                    if(!arrayLocals.includes(arrayKino[i])){
                        arrayLocals = [arrayKino[i]]
                        for(let i = 0; i<arrayLocals.length; i++){
                            objectLocals.Title = arrayLocals[i].Title
                            objectLocals.Poster = arrayLocals[i].Poster              
                            window.localStorage.setItem("localsKino", JSON.stringify(objectLocals))
                            parses = JSON.parse(window.localStorage.getItem("localsKino"))
                            console.log(parses)
                            let li = createTag("li")
                            let img = createTag("img")
                            img.src = parses.Poster
                            li.appendChild(img)
                            let h2 = createTag("h2")
                            h2.appendChild(textNode(parses.Title))
                            li.appendChild(h2)      
                            locals.appendChild(li)
                            allsLocals = [...allsLocals, parses]
                            console.log(allsLocals)
                        }                
                    }
                }
            }
        }   
    }
    parses = JSON.parse(window.localStorage.getItem("localsKino"))
    console.log(parses) 
    let li = createTag("li")
    let img = createTag("img")
    img.src = parses.Poster
    li.appendChild(img)
    let h2 = createTag("h2")
    h2.appendChild(textNode(parses.Title))
    li.appendChild(h2)
    locals.appendChild(li)
    let dowload_btn = renderElement(".dowload__kino")
    const locals__text = renderElement(".timeOut")
    const handleChangeEdit = () => {
        if(allsLocals.length >= 1){
            locals__text.classList.add("timeOutBlock")
            setTimeout(() => {
                window.location.replace("./login.html")
            }, 1500)
        }else{
            console.log(false)
        }
    }
    dowload_btn.addEventListener("click", handleChangeEdit)