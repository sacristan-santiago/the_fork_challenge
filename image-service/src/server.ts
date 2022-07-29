import express from 'express';
import bodyParser from 'body-parser'

/***
 *     _______   ______
 *    |       \ /  __  \
 *    |  .--.  |  |  |  |
 *    |  |  |  |  |  |  |
 *    |  '--'  |  `--'  |
 *    |_______/ \______/
 *
 *    .__   __.   ______   .___________.
 *    |  \ |  |  /  __  \  |           |
 *    |   \|  | |  |  |  | `---|  |----`
 *    |  . `  | |  |  |  |     |  |
 *    |  |\   | |  `--'  |     |  |
 *    |__| \__|  \______/      |__|
 *
 *     _______  _______   __  .___________.
 *    |   ____||       \ |  | |           |
 *    |  |__   |  .--.  ||  | `---|  |----`
 *    |   __|  |  |  |  ||  |     |  |
 *    |  |____ |  '--'  ||  |     |  |
 *    |_______||_______/ |__|     |__|
 *
 *    .___________. __    __   __       _______.
 *    |           ||  |  |  | |  |     /       |
 *    `---|  |----`|  |__|  | |  |    |   (----`
 *        |  |     |   __   | |  |     \   \
 *        |  |     |  |  |  | |  | .----)   |
 *        |__|     |__|  |__| |__| |_______/
 *
 *    .______   .______        ______          __   _______   ______ .___________.
 *    |   _  \  |   _  \      /  __  \        |  | |   ____| /      ||           |
 *    |  |_)  | |  |_)  |    |  |  |  |       |  | |  |__   |  ,----'`---|  |----`
 *    |   ___/  |      /     |  |  |  | .--.  |  | |   __|  |  |         |  |
 *    |  |      |  |\  \----.|  `--'  | |  `--'  | |  |____ |  `----.    |  |
 *    | _|      | _| `._____| \______/   \______/  |_______| \______|    |__|
 *
 */

const main = async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  let images = [
    {
      imageUuid: 'b228cef9-e8b3-4f0d-b1ac-983ad28b9462',
      url: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/silicon-valley-memes/large/unspecified-1.jpg?1384968217'
    },
    {
      imageUuid: '0bed02f0-53b0-432c-9a6c-3c3fdcc4f3ff',
      url: 'https://lesjoiesducode.fr/wp-content/uploads/2020/04/pUk30T7.jpg'
    },
    {
      imageUuid: 'db077d40-fc3a-4cc1-8aaf-83d03e81d67f',
      url: 'https://i.pinimg.com/600x315/78/3f/a5/783fa50427050800de4ebabb826c761b.jpg'
    },
    {
      imageUuid: 'b04ab411-2e35-4492-a5ce-c96691e73d68',
      url: 'https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif'
    }
  ];

  app.get('/images', (_req, res) => {
    res.send({
      images
    })
  });

  app.listen({ port: 3010 }, () => console.info(
    `🚀 Server ready and listening at ==> http://localhost:3010`,
  ));
};

main().catch((error) => {
  console.error('Server failed to start', error);
});
