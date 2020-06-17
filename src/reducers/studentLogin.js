const initialState = {
    student: {
        id: 23984,
        name: "Mannie Alvarez",
        email: "carlos.alvarezberrio@gmail.com",
        password: "1234",
        openTickets: [],
        closedTickets: [],
    },
    isFetching: false,
    error: ""
}

export const studentLogin = (state = initialState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}