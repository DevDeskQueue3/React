const initialState = {
    tickets: [
        {
            id: 6516,
            title: "Need a Hiatus!",
            description: "I am having a hard time keeping up with the schedule due to work, need to get some time off to gather myself.",
            postedAt: "2020-06-20T00:03:11.617Z",
            postedBy: "Joseph Lynn",
            claimedBy: "",
            status: "open",            
        }
    ],
    isFetching: false,
    error: ""
}

export const tickets = (state = initialState, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}