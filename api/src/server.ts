/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import errorHandler from 'errorhandler';
import compression from 'compression';  // compresses requests
import path from 'path';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import SendGrid from '@sendgrid/mail';
import { createExpressServer, Action } from 'routing-controllers';
import bodyParser from 'body-parser';
import Config from '@api/util/config';
import Database from '@api/database';
import { UserController } from '@api/controllers';
import Passaport from '@api/util/passport';
import express from 'express';

Config.init();

let server: any;

Database.connect().
    then((): void => {

        // Cria um servidor express.
        const app = createExpressServer({
            routePrefix: '/api',
            cors: true,
            controllers: [UserController],
            authorizationChecker: async (action: Action): Promise<boolean> => {
                const token = action.request.headers.authorization.split('Bearer ')[1];
                try {
                    jwt.verify(token, process.env.JWT_SECRET);
                    return true;
                } catch{
                    return false;
                }
            },
            currentUserChecker: async (action: Action): Promise<number> => {
                const token = action.request.headers.authorization.split('Bearer ')[1];
                const payload: any = jwt.verify(token, process.env.JWT_SECRET);
                return Number(payload.sub);
            }
        });
        
        app.set('port', process.env.PORT || 3000); // porta
        app.use(express.static(path.join(__dirname, '../..', 'client/dist/dashboard')));

        server = app.listen(process.env.PORT || 3000, (): void => {
            console.log(
                '  App is running at http://localhost:%d in %s mode',
                app.get('port'),
                app.get('env')
            );
            console.log('  Press CTRL-C to stop\n');
        });

        SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

        // Configurações do express 
        app.use(passport.initialize());
        app.use(errorHandler());
        app.use(compression()); //compressão dos arquivos
        app.use(bodyParser.json()); // formatação dos dados de resposta/body da Api
        app.use(bodyParser.urlencoded({ extended: true })); // formatação dos dados de resposta/body da Api

        new Passaport().use();

        app.get('*', (_req: express.Request, res: express.Response): any => {
            res.sendFile(path.join(__dirname, '../..', 'client/dist/dashboard/index.html'));
        });
    });

export default server;
