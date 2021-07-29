const localStorageMiddleware = store => next => action => {  
    
    if (action.type === "INCREMENT") {
       
       console.log('INCREMENT');
       
    } else if (action.type === "DECREMENT") {
       
       console.log('DECREMENT');
    }

    next(action);
};


export { localStorageMiddleware }
