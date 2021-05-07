const saveObjectToLocal = (object, type) => {

    function saveObject(){
        let temp = JSON.stringify(JSON.stringify(object));

        //console.log(temp);

        localStorage.removeItem(type);
        localStorage.setItem(type, temp);
    }

    saveObject();
}

export default saveObjectToLocal;