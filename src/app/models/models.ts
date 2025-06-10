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

export class UserRegister {
    uid: number
    email: string
    login: string
    first_name: string
    last_name: string
    phoneNumber: string
    password: string

    constructor() {
        this.uid = 0
        this.email = ''
        this.login = ''
        this.first_name = ''
        this.last_name = ''
        this.phoneNumber = ''
        this.password = ''
    }
}

export class LoginModel {
    email: string
    password: string

    constructor() {
        this.email = ''
        this.password = ''
    }
}

//export interface Item {
//    category_id: number,
//    id: number,
//    name: string,
//    brand: string,
//    image: string,
//    price: number,
//    size: string[]
//}