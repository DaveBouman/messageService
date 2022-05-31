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

    getLatestTweets = async (username: string) => {
        return await this.messageRepository.getLatestTweets(username);
    }

    heartKweet = async (userId: string, kweetId: string) => {
        return await this.messageRepository.heartKweet(userId, kweetId);
    }

    getTrendsKweets = async (trend: string) => {
        return await this.messageRepository.getTrendsKweets(trend);
    }

    getLatestTrends = async () => {
        return await this.messageRepository.getLatestTrends();
    }

    getFollowing = async (userId: string[]) => {
        return await this.messageRepository.getFollowing(userId);
    }
}

export default MessageService