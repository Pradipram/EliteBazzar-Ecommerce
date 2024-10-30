export const addEllipsis = (text) => {
    // console.log("title: ",text); 
    if(text.length > 50) {
        return text.substring(0, 50) + '...';
    }
    else{
        return text;
    }
}