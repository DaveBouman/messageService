import 'dotenv/config'
import 'reflect-metadata';
import express, { json } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index';
import morganMiddleware from './middleware/morganMiddelware';
import cookieSession from "cookie-session";
import DataSource from './dataSource';
import cookieParser from 'cookie-parser';
import Logger from './logger/logger';
import { CommunicationProtocolEnum, DaprClient, DaprServer } from 'dapr-client';

const corsOptions = {
    origin: '*',
    methods: "GET, PUT, DELETE, POST",
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

DataSource
    .initialize()
    .then(() => {
        Logger.info("Data Source has been initialized!")
    })
    .catch((err: Error) => {
        Logger.error("Error during Data Source initialization:", err)
    })

const app = express();

app.use(
    cookieSession({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_SESSIONS_KEY],
    })
);

app.use(cookieParser());
app.use(morganMiddleware);
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}));
app.use('/api/v1/messages', routes);

// start express server
app.listen(3002);

// async function start() {
//     const daprHost = 'localhost';
//     const daprPort = '53002';
//     const serverHost = 'localhost';
//     const serverPort = '3003';
//     console.log("test");


//     const server = new DaprServer(serverHost, serverPort, daprHost, daprPort, CommunicationProtocolEnum.HTTP);
//     const client = new DaprClient(daprHost, daprPort, CommunicationProtocolEnum.HTTP);
//     console.log("test2");

//     // Initialize the server to subscribe (listen)
//     await server.pubsub.subscribe("my-pubsub-component", "my-topic", async (data: Record<string, any>) => {
//         // The library parses JSON when possible.
//         console.log(`[Dapr-JS][message service] Received on subscription: ${(data)}`)
//     });

//     await server.start();
//     console.log("test3");

//     // Send a message
//     // await client.pubsub.publish("my-pubsub-component", "my-topic", { hello: "world" });
//     console.log("test4");
//     var result = await client.state.get("postgres", "order_3");
//     console.table(result);
//     console.log("Result after get: " + JSON.stringify(result));
//     // app.use('/dapr', async () => await client.pubsub.publish("my-pubsub-component", "my-topic", { hello: "This is by api" }));
//     // await server.pubsub.subscribe("my-pubsub-component", "my-topic", async (data: any) => console.log(`Received: ${JSON.stringify(data)}`));
// }

// start().catch((e) => {
//     console.error(e);
//     process.exit(1);
// });
