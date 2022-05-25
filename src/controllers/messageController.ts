import { Request, Response } from 'express';
import { Message } from '../entities/database/message';
import MessageService from '../services/messageService';
import BaseController from './baseController';
import jwt_decode from "jwt-decode";

class MessageController extends BaseController<Message> {

    constructor(private messageService = new MessageService()) {
        super(Message);
    }

    override create = async (req: Request, res: Response) => {
        const jwt: any = jwt_decode(`${req.cookies['session.sig']}.${req.cookies["session"]}`);

        const entity = new Message();
        entity.content = req.body.content;
        entity.name = req.body.name;
        entity.userId = jwt.passport.user.id;

        const response = await this.messageService.create(entity);

        return res.send({
            message: "successful",
            entity: response,
        });
    };

    test = async (req: Request, res: Response) => {
        return res.send({
            message: "successfull",
            entity: 'this is atest',
        });
    };

    search = async (req: Request, res: Response) => {
        const query = req.query.query as string;
        const response = await this.messageService.search(query);
        return res.send({
            message: "succesfull",
            entity: response
        });
    };

    getLatestTweets = async (req: Request, res: Response) => {
        const jwt: any = jwt_decode(`${req.cookies['session.sig']}.${req.cookies["session"]}`);
        const name = jwt.passport.user.username;

        const response = await this.messageService.getLatestTweets(name);
        return res.send({
            message: "succesfull",
            entity: response
        });
    }

    getMentions = async (req: Request, res: Response) => {
        const jwt: any = jwt_decode(`${req.cookies['session.sig']}.${req.cookies["session"]}`);
        const name = `@${req.body.name}`;

        if (`@${jwt.passport.user.displayname}` !== name) {
            return res.send({
                message: "couldn't retrieve mentions",
                entity: 'not found'
            });
        }

        const response = await this.messageService.getMentions(name);
        return res.send({
            message: "succesfull",
            entity: response
        });
    };
}

export default MessageController
