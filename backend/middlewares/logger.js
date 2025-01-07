import morganBody from "morgan-body";
import express from "express";


export const loggerInit = (app) => {

    app.use(express.json());


    morganBody(app, {
        logRequestBody: true,
        prettify: true,
        maxBodyLength: 1000,
    });
};
