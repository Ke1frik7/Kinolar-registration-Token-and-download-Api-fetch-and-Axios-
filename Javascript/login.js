let kino = JSON.parse(window.localStorage.getItem("localsKino"))
const parse = JSON.parse(window.localStorage.getItem("token"))
let form = renderElement("form")
let name = renderElement(".name__input")
let email = renderElement(".email__input")
let password = renderElement(".password__input")
const nav_title = renderElement(".nav__title")
const timeText = renderElement(".timeOut")
let object;
const handleSub = (event) => {
    event.preventDefault() 
    for(let i = 0; i<parse.length ; i++){
        object = parse[i]
    }
    if(name.value.trim() === object.name && email.value.trim() === object.email && password.value.trim() === object.password){
        nav_title.textContent = "Ma'lumotlar tug'ri"
        nav_title.style.color = "white"
        timeText.classList.add("timeOutBlock")
        setTimeout(() => {
            // window.location.replace("locals.html")
            window.location.replace(`https://www.google.com/search?q=${kino.Title}+dowload`)
        }, 1500)
    }else{
        nav_title.textContent = "Ma'lumotlar notug'ri kiritildi"
        nav_title.style.color = "red"
        console.log(false)
    }
}
form.addEventListener("submit", handleSub)
// https://www.google.com/search?q=Spiderman&