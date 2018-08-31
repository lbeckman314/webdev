let names = document.getElementsByClassName("name");
let maxWidth = 0;

for (let i = 0; i < names.length; i++) {
    console.log("names: " + names[i].offsetWidth);
    if (names[i].offsetWidth > maxWidth) {
        maxWidth = names[i].offsetWidth;
    }
}

for (let i = 0; i < names.length; i++) {
    names[i].style.width = maxWidth + "px";
}
