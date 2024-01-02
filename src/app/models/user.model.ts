/* Definición de la interfaz para UserModel. */
export interface UserModel{
    id?:number;
    numeros?:number[];
    textarea?:string;
    name:string;
    select?:number;
    option?:number;
    username:string;
    email:string;
    address:AdrressModel;
    phone:string;
    website:string;
    company:CompanyModel
}
/* Definición de la interfaz para AdrressModel. */
export interface AdrressModel{
    street:string;
    suite:string;
    city:string;
    cityNumberSelect?:number;
    zipcode:string;
    geo:GeoModel
}
/* Definición de la interfaz para GeoModel. */
export interface GeoModel{
    lat:string;
    lng:string;
}

/* Definición de la interfaz para CompanyModel. */
export interface CompanyModel{
    catchPhrase:string;
    name:string;
    bs:string;
}