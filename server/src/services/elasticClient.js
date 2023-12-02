import {Client} from '@elastic/elasticsearch'
import dotenv from "dotenv"
 
dotenv.config();

const ELASTIC_CLOUD_ID = process.env.ELASTIC_CLOUD_ID;
const ELASTIC_USERNAME = process.env.ELASTIC_USERNAME;
const ELASTIC_PASSWORD = process.env.ELASTIC_PASSWORD;

const elasticClient = new Client({
    cloud: {
        id: ELASTIC_CLOUD_ID
    },
    auth: {
        username: ELASTIC_USERNAME,
        password: ELASTIC_PASSWORD
    }
})

export default elasticClient;
