const saveUserToLocal = (user) => {

    function saveUser(){
        let temp = JSON.stringify(JSON.stringify(user));

        console.log(temp);
        
        if (temp.userId !== null){
            localStorage.clear();
            localStorage.setItem("User", temp);
        }
        else{
            console.log(temp);
        }
    }

    saveUser();
}

export default saveUserToLocal;