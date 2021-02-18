console.log('Welcome to my app.js');
showNotes();
//If user ads a note,add it to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let addDate = document.getElementById("addDate");
    
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj= {
        title: addTitle.value,
        text: addTxt.value,
        date: addDate.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value= "";
    addDate.value="";
    console.log(notesObj);
    showNotes();
})
//Function to show elements from local stores
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card text-white bg-dark mb-3" style = "max-width: 18rem;" >
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            ${element.date}
                            <p class="card-text">${element.text}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" id="addBtn">Delete Note</a>
                        </div>
                    </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } 
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


//function to delete a note
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
    notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
 search.addEventListener("input", function(){
     let inputVal= search.value.toLowerCase();
     let noteCards= document.getElementsByClassName('noteCard');
     Array.from(noteCards).forEach(function(element){
         let cardTxt= element.getElementsByTagName("p")[0].innerText;
         if(cardTxt.includes(inputVal)){
            element.style.display = "block";

         }
         else{
            element.style.display = "none";
         }
     })
 })