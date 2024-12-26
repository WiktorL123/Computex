import morganBody from "morgan-body";
import express from "express";


export const loggerInit = (app) => {
    /**
     * Inicjuje middleware logujące z morgan-body.
     * @param {express.Application} app - Instancja aplikacji Express.
     */
    app.use(express.json());


    morganBody(app, {
        logRequestBody: true,
        prettify: true,
        maxBodyLength: 1000,
    });
};
