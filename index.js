/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import cors from 'cors';
import express from 'express';
import {
    ApolloServer
} from 'apollo-server-express';

const app = express();

app.use(cors());

const server = new ApolloServer({});

server.applyMiddleware({
    app,
    path: '/graphql'
});

app.listen({
    port: 8008
}, () => {
    console.log('Apollo Server on http://localhost:8008/graphql');
});

AppRegistry.registerComponent(appName, () => App)

