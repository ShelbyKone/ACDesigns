import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

export function setEnvironment(app) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
        setDevEnv(app);
    } else {
        setProdEnv(app);
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development'
    process.env.DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/acdesigns-dev?authSource=admin&retryWrites=true&w=majority`
    app.use(bodyParser.json());
    app.use(morgan('dev'))
    app.use(cors())
}

function setProdEnv(app) {
    process.env.NODE_ENV = 'production';
    process.env.DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/acdesigns-prod?authSource=admin&retryWrites=true&w=majority`
    app.use(bodyParser.json())
    app.use(express.static(__dirname + '/../../dist'))
}