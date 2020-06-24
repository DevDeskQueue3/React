export const setStatusColor = (cardType, status) => {
    let colorClass = "";

    /* Set the ticket status color according to the ticket status */
    if(cardType === "PREVIEW"){
        switch(status){
            case "OPEN":
                colorClass = "preview-card-red";
                break;
            case "CLOSED":
                colorClass = "preview-card-green";
                break;
            case "RESOLVED":
                colorClass = "preview-card-purple";
                break;
            default:
                break;
        };
    }
    else if(cardType === "TICKET"){
        switch(status){
            case "OPEN":
                colorClass = "ticket-card-red";
                break;
            case "CLOSED":
                colorClass = "ticket-card-green";
                break;
            case "RESOLVED":
                colorClass = "ticket-card-purple";
                break;
            default:
                break;
        };
    }

    return colorClass;
};