export interface ArticleCard {
    id: number,
    userId: Omit<AtricleUser, 'id'>,
    title: string,
    body: string
}

export interface AtricleUser  { 
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    company: Company
}
export interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: Omit<GeoDate, 'lat'|"lng">
}
export interface GeoDate {
    lat: string,
    lng: string
}
export interface Company {
    name: string,
    catchPhrase: string,
    bs: string
}


