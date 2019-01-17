// // Check Off Specific Todos By Clicking
// $("ul").on("click", "li", function(){
//     $(this).toggleClass("completed");
// });

// // Click on X to delete Todo
// $("ul").on("click", "span", function(event){
//     $(this).parent().fadeOut(500, function(){
//         $(this).remove();
//     });
//     event.stopPropagation(); // Do span o trong li nen neu ko co se goi ca func li
// });
// $("input[type='text']").keypress(function(event){
//     if(event.which === 13){
//         //grabbing new todo text from input
//         var todoText = $(this).val();
//         $(this).val("");
//         //create a new li and add to ul
//         $("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> " + todoText + "</li>");
//     }
// });
// $(".fa-plus").click(function(){
//     $("input[type='text']").fadeToggle();
// });

var dataToDo = ["Đến lớp học tiếng anh", "Mua thẻ nạp điện thoại", "Mua kem đánh răng"];
var storageKey = 'dataToDo';
if (localStorage.dataToDo) {
    dataToDo = JSON.parse(localStorage.dataToDo);
    document.querySelectorAll("li").forEach(element => {
        element.remove();
    });
    dataToDo.forEach(e => {
        let newLi = document.createElement("li");
        let newSpan = document.createElement("span");
        let newI = document.createElement("i");

        newI.setAttribute("class", "fas fa-trash-alt");
        newSpan.appendChild(newI);
        newLi.appendChild(newSpan);
        newLi.appendChild(document.createTextNode(e));

        document.querySelector("ul").appendChild(newLi);
    });
} else {
    localStorage.setItem(storageKey, JSON.stringify(dataToDo));
}

{
    let lis = document.querySelectorAll("li");
    lis.forEach(element => {
        element.addEventListener("click", (event) => {
            // event.target.classList.toggle("completed");      // event.target <=> event.stopPropagation() of JQuery
            event.target.classList.toggle("completed");
        });
    });
}

{
    let spans = document.querySelectorAll("span");
    spans.forEach(element => {
        element.addEventListener("click", (event) => {
            dataToDo = dataToDo.filter(word => word != element.parentNode.textContent);
            localStorage.setItem(storageKey, JSON.stringify(dataToDo));
            element.parentNode.remove();
        });
    });
}

{
    // JavaScript HTML DOM Events
    let text = document.querySelector("input[type='text']");
    text.onkeypress = (event) => {
        if (!(text.value === "") && event.keyCode === 13) {
            //grabbing new todo text from input
            let todoText = text.value;
            text.value = "";
            dataToDo.push(todoText);
            localStorage.setItem(storageKey, JSON.stringify(dataToDo));

            // create a new HTMLelement and add to document
            let newLi = document.createElement("li");
            let newSpan = document.createElement("span");
            let newI = document.createElement("i");

            newI.setAttribute("class", "fas fa-trash-alt");
            newSpan.appendChild(newI);
            newLi.appendChild(newSpan);
            newLi.appendChild(document.createTextNode(todoText));

            // add 2 event (completed, remove to new element)
            newLi.addEventListener("click", (e) => {
                e.target.classList.toggle("completed");
            });
            newSpan.addEventListener("click", (e) => {
                dataToDo = dataToDo.filter(word => word != newSpan.parentNode.textContent);
                localStorage.setItem(storageKey, JSON.stringify(dataToDo));
                newSpan.parentNode.remove();
            });

            // add HTMLelement to page
            document.querySelector("ul").appendChild(newLi);
        };
    };
}

document.querySelector(".fa-plus").addEventListener("click", (e) => {
    if (document.querySelector("input[type='text']").style.display === "none")
        document.querySelector("input[type='text']").style.display = 'block';
    else document.querySelector("input[type='text']").style.display = 'none';
});