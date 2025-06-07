export interface NewItem {
    id: number,
    title: string,
    image: string
}

export interface CategoryItem {
    id: number,
    title: string,
    image: string
}

export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    image: string,
}

export interface CategoryItem {
    id: number,
    title: string,
    image: string
}

export interface Categories {
    toLowerCase(): unknown
    id: number,
    title: string,
    image: string
}

export interface CategoryItems {
    category_id: number,
    id: number,
    name: string,
    brand: string,
    image: string
}

export interface AllItems {
    category_id: number,
    id: number,
    name: string,
    brand: string,
    image: string
}