// drug type

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

// manufacturer
export interface ManufacturerResponse {
    id:        number;
    name:      string;
    country:   string;
    createdAt: Date;
}

export interface ManufacturerRequest {
    name:      string;
    country:   string;
}

// supplier
export interface SupplierResponse {
    id:        number;
    name:      string;
    address:   string;
    phone:     string;
    email:     string;
    createdAt: Date;
}

export interface SupplierRequest {
    name:      string;
    address:   string;
    phone:     string;
    email:     string;
}