export const getCurcity = () =>{
    const curCity = JSON.parse(localStorage.getItem('city'))
    if(!curCity){
        const curCity = '上海'
        return curCity
    }else{
        return curCity
    }
}

