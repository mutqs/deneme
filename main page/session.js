class Session {

    static getSearchedWordsFromSession(){

        let searching ;

        if(sessionStorage.getItem("searched") === null){
            searching= [];
        }
        else{
            searching = JSON.parse(sessionStorage.getItem("searched"));
        }
        return searching ;

    }

    static addSearchedWordstoSession(username){

        let searching = this.getSearchedWordsFromSession();

        if(searching.indexOf(username) === -1) {
            searching.push(username);
        }

        sessionStorage.setItem("searched",JSON.stringify(searching));
    }
}