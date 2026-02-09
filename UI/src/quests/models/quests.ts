
export interface question {
    id: number;
    name: string;
    description: string;
    image: string | null;
    question: string;
    buttons: string;
    answer: string;
    text_after_answer: string;
    sort_number: number | null;
    quest_id: number;
}


export interface quest {
    id : number,
    name : string,
    description : string,
    image : File | null,
    start : string,
    price : number,
    duration : number,
    questions : string,
    public: boolean,
    image_url: string
}
export interface questAction {
    type: string;
    payload: [];
}
