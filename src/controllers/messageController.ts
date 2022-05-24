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
            message: "successful",
            entity: 'this is atest',
        });
    };

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
            message: "succesful",
            entity: response
        });
    };
}

export default MessageController
