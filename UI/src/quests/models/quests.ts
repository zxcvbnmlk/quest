
export interface question {
    id: number;
    name: string;
    description: string;
    image: string | null;
    question: string;
    buttons: string[] | null;
    answer: string;
}


export interface quest {
    id : string,
    name : string,
    description : string,
    image : string,
    start : string,
    price : number,
    duration : number,
    questions : []
    public: boolean
}
export interface questAction {
    type: string;
    payload: [];
}
