const coll = document.getElementsByClassName("collapsible")
let content

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active")
        content = this.nextElementSibling
        if (content.style.display === "block") {
            content.style.display = "none"
        } else {
            content.style.display = "block"
        }
    })
}