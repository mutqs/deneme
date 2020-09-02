const youtubeForm = document.querySelector("#filter1");
const youtubeSearch = document.querySelector("#btn-youtube");

eventListeners()

function eventListeners() {
    youtubeForm.addEventListener("submit", getData);
    youtubeSearch.addEventListener("click", searchInYoutube);

}

function getData(e) {
    let username = youtubeForm.value.trim();

    if (username != "") {

        

        youtubeSearch.innerHTML = `<a href="https://www.youtube.com/results?search_query=${username}" type="submit" class="btn btn-dark ml-2"  id="btn-youtube" target="_blank" > Ara</a> `

        Session.addSearchedWordstoSession(username);
    } 
    
   
    e.preventDefault();
}

function searchInYoutube(){

    let searching = Session.getSearchedWordsFromSession();



}





