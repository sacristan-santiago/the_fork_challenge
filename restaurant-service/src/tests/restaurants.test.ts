import { RestaurantOutputBuilder } from "../restaurants"
import axios from '.././services/axios'

//EXAMPLE TEST

jest.mock('.././services/axios')
const mockedAxios = axios as jest.Mocked<typeof axios>


test('builder should find images from axios request', async () => {
    const builder = new RestaurantOutputBuilder()
    const expected = [{
        imageUuid:"b228cef9-e8b3-4f0d-b1ac-983ad28b9462",
        url:"https://cdn.pastemagazine.com/www/system/images/photo_albums/silicon-valley-memes/large/unspecified-1.jpg?1384968217"
    }]

    mockedAxios.get.mockResolvedValue({
        data: {
            images: expected
        }
    })

    const data = await builder.findUrls()
    expect(data).toStrictEqual(expected)

})


//... and so on I would test each method inside the class RestaurantsOutput