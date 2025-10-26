export interface Blog {
    id:          number;
    title:       string;
    description: string;
    status:      string;
    thumbnail:   string;
    category:    CategoryType;
    author:      AuthorType;
    likes:       number;
    relatedLink: string;
    publishedAt: Date;
    tags:        TagType[];
    content:     string;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface AuthorType {
    id:            number;
    fullName:      string;
    avatar:        null;
    specialtyName: string;
}

export interface CategoryType {
    id:          number;
    name:        string;
    description: string;
}

export interface TagType {
    id:   number;
    name: string;
}
