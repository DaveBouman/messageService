import { DeepPartial } from "typeorm";
import MessageConsumer from "../consumers/messageConsumer";
import { Message } from "../entities/database/message";
import MessageRepository from "../repositories/messageRepository";
import BaseService from "./baseService";

class MessageService extends BaseService<Message> {

    constructor(private messageRepository = new MessageRepository(Message),
    ) {
        super(Message);
    }

    override async create(entity: Message) {
        return await this.messageRepository.save(entity);
    }

    getMentions = async (name: string) => {
        return await this.messageRepository.findMentions(name);
    }

    search = async (query: string) => {
        return await this.messageRepository.search(query);
    }
}

export default MessageService