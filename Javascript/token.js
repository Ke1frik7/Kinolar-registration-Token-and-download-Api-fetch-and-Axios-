window.addEventListener("load", () => {
    class tokenValigator{
        constructor(name, email, password){
            this.name = name
            this.email = email
            this.password = password
        }
    }
    let form = renderElement("form")
    let name_input = renderElement(".name__input")
    let email_input = renderElement(".email__input")
    let password_input = renderElement(".password__input")
    let nav_title = renderElement(".nav__title")
    let token;
    let tokenArray = []
    const handleSub = (event) => {
        event.preventDefault()
        token = new tokenValigator(name_input.value, email_input.value, password_input.value)
        tokenArray = [...tokenArray, token]
        console.log(tokenArray)
        if(tokenArray.includes(token)){
            window.localStorage.setItem("token", JSON.stringify(tokenArray))
            nav_title.textContent = "Token yaratilmoqda ..."
            setTimeout(() => {
                window.location.replace("movies.html")
            }, 2000)
        }
    }
    form.addEventListener("submit", handleSub)
})