import knex from './services/knex'
import axios from './services/axios'

//FINAL THOUGHTS: probably the RestaurantOutputBuilder class could be splitted 
//into a PaginationBuilder/RestaurantBuilder class

//Also, I think maybe Knex/Axios(with find methods) could be another class
//pass to the builders in the constructor.

//Finally, testing, only one test was made, as an example. Each object method
//should be tested. Including those from the improvements mentioned above.


//With this thoughts in mind I leave you the code..

export class RestaurantOutputBuilder  {
    async build(
        name: String | undefined,
        imageOnly: Boolean = false,
        page: number | undefined = 1,
        size: number | undefined = 10
    ): Promise<RestaurantsOutput> {

        const nonPaginatedRestaurants = this.findNonPaginatedRestaurants(name, imageOnly)
        
        //BUILD PAGINATION -not sure if total meant per page or from all pages. Considered items from all pages-
        const total = (await nonPaginatedRestaurants).length 
        const pageCount = Math.ceil(total/size)
        const currentPage = page
        const pagination = new Pagination(total, pageCount, currentPage)


        //BUILD RESTAURANTS
        const paginatedRestaurants: DbRestaurant[] = await this.findPaginatedRestaurants(nonPaginatedRestaurants, page, size)     
        const images: DbImages[] = await this.findImages()
        const countries: DBCountries[] = await this.findCountries()
        const urls: DBUrls[] = await this.findUrls()
       
        const restaurants = paginatedRestaurants.map (resto => {
            
            const restaurantImages: DbImages[] = images.filter(image => image.restaurant_uuid == resto.restaurant_uuid)
            
            const locales: String[] | undefined = countries.find(country => country.country_code == resto.country_code)!!.locales
            
            const country: Country = (locales) ? new Country (resto.country_code, locales ) : new Country (resto.country_code, [])
            
            const allowReview: Boolean = (country.code == 'FR') ? true : false
           
            const restaurantImageUrls: String[] = (restaurantImages.length > 0 ) ? images.map (
                image => urls.find (url => url.imageUuid == image.image_uuid)!!.url
            ) : []

            return  new Restaurant(
                resto.restaurant_uuid,
                resto.name,
                country,
                restaurantImageUrls,
                allowReview
            )
        })

        //BUILD OUTPUT
        return new RestaurantsOutput(restaurants, pagination)
    }

    findImages() {
        return knex<DbImages>('restaurant_has_image')
    }

    findCountries() {
        return knex<DBCountries>('country')
    }

    async findUrls() {
        return (await axios.get<RestUrls>('/images')).data.images
    }

    findRestaurants() {
        return knex<DbRestaurant>('restaurant')
    }

    filterByName(restaurants: any, name: String | undefined) {
        if (name != undefined) {
            return restaurants.where('name', name)
        } else {
            return restaurants
        }
    }

    filterByImage(restaurants: any, imageOnly: Boolean) {
        if (imageOnly) {
            return restaurants
                .whereExists(knex.select('*').from('restaurant_has_image')
                    .whereRaw('restaurant.restaurant_uuid = restaurant_has_image.restaurant_uuid')
                )
        } else {
            return restaurants
        }   
    }

    findNonPaginatedRestaurants(name: String | undefined, imageOnly: Boolean) {
        return this.filterByImage(
            this.filterByName(
                this.findRestaurants(),
                name
            ),
            imageOnly
        )
    }

    findPaginatedRestaurants(restaurants: any,  page: number, size: number) {
        const correctedPage = (page < 1) ? 1 : page
        const offset = size*(correctedPage-1)
        const limit = size

        return restaurants.orderBy('restaurant_uuid', 'desc').offset(offset).limit(limit)
    }
}

export interface RestUrls {
    images: [DBUrls]
}

interface DBUrls {
    imageUuid: String, 
    url: String
}

interface DBCountries {
    country_code: String,
    locales: String[]
}

interface DbRestaurant {
    restaurant_uuid: String,
    name: String, 
    country_code: String
}

interface DbImages {
    restaurant_uuid: String,
    image_uuid: String
}

class RestaurantsOutput {
    restaurants: Restaurant[]
    pagination: Pagination

    constructor(restaurants: Restaurant[], pagination: Pagination) {
    this.restaurants = restaurants;
    this.pagination = pagination;
    }
}

class Restaurant {
    restaurantUuid: String
    name: String
    country: Country
    images: String[]
    allowReview: Boolean

    constructor(restaurantUuid: String, name: String, country: Country, images: String[], allowReview: Boolean) {
    this.restaurantUuid = restaurantUuid;
    this.name = name;
    this.country = country;
    this.images = images;
    this.allowReview = allowReview;
    }
}

class Country {
    code: String
    locales: String[]

    constructor(code: String, locales: String[]) {
        this.code = code
        this.locales = locales
    }
}

class Pagination {
    total: Number
    pageCount: Number
    currentPage: Number

    constructor(total: Number, pageCount: Number, currentPage: Number ) {
        this.total = total,
        this.pageCount = pageCount,
        this.currentPage = currentPage
    }
}