


export const getType = (value, body) => {
    if(value.params){
        return { params: body};
    } else if(value.query) {
        if(typeof body === 'object'){
            return { query: body._id };
        } else {
            return { query: body };
        }
    } else {
        return {};
    }
}