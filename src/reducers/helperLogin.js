const initialState = {
    helper: {
        id: 23984,
        name: "Mannie Alvarez",
        email: "carlos.alvarezberrio@gmail.com",
        password: "1234",
        assignedTickets: [],        
    },
    tickets: [],
    isFetching: false,
    error: ""
}

export const helperLogin = (state = initialState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}