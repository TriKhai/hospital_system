export interface DrugTypeResponse {
    id:        number;
    name:      string;
    unit:      string;
    createdAt: Date;
}

export interface DrugTypeRequest {
    name:      string;
    unit:      string;
}
