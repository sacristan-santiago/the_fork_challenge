import { RestaurantOutputBuilder } from './restaurants'

export class Query {
    async findRestaurants(name: String | undefined, imageOnly: Boolean | undefined, page: number, size: number) {
        return await new RestaurantOutputBuilder().build(name, imageOnly, page, size)
    } 
}