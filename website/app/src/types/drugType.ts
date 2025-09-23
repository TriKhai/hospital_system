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
            
// drug
export interface DrugResponse {
    id:                number;
    name:              string;
    price:             number;
    stock:             number;
    expiredAt:         Date;
    image:             string;
    usageInstructions: string;
    effects:           string;
    createdAt:         Date;
    updatedAt:         Date;
    manufacturer:      ManufacturerResponse;
    supplier:          SupplierResponse;
    drugType:          DrugTypeResponse;
}

export interface DrugRequest {
  name: string;
  price: number;
  stock: number;
  expiredAt: Date;
  usageInstructions?: string | null;
  effects?: string | null;
  image?: string | File | null;
  manufacturerId: number;
  supplierId: number;
  drugTypeId: number;
}

export interface DrugFormValues {
  name: string;
  price: number;
  stock: number;
  expiredAt: string; 
  usageInstructions?: string;
  effects?: string;
  image?: string | File | null;
  manufacturerId: string;
  supplierId: string;
  drugTypeId: string;
}

