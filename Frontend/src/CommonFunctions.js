const CommonFunctions = {
    validate : (obj,ejectKeys) => {
        if(ejectKeys){
            ejectKeys.forEach(element => {
                delete obj[element]
            });
        }
        for (let i = 0; i < Object.values(obj).length; i++) {
            if (Object.values(obj)[i] === '' || Object.keys(obj)[i] === 'email' ? !Object.values(obj)[i].includes('@') : false) {
                return true
            }
        }
        return false
    }
}

export default CommonFunctions