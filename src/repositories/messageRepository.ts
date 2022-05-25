import { LessThan, Like, MoreThan } from 'typeorm';
import { Message } from '../entities/database/message';
import { BaseRepository } from './baseRepository';

class MessageRepository extends BaseRepository<Message> {

    /*
    example function on how to override from base implementation
    */

    // override async getOneByUUID(uuid: string) {
    //     return await this.repository.findOne({
    //         where: {
    //             uuid: uuid
    //         }
    //     })
    // }

    getLatestTweets = async (username: string) => {
        return await this.repository.find({
            where: {
                name: username,
            },
            take: 10
        })
    }

    heartKweet = async (userId: string, kweetId: string) => {
        let entity = await this.repository.findOne({
            where: {
                id: kweetId
            }
        })

        entity?.userHeartId.push(userId);

        return this.repository.save({ ...entity });
    }

    getTrendsKweets = async (trend: string) => {
        const now = new Date();
        return await this.repository.findBy({
            content: Like(`%#${trend}%`)
        })
    }

    findMentions = async (name: string) => {
        return await this.repository.findBy({
            content: Like(`%${name}%`)
        })
    }

    getLatestTrends = async () => {
        return await this.repository.find({
            select: {
                content: true
            },
            where: {
                content: Like(`%#%`)
            }
        })
    }

    search = async (query: string) => {
        return await this.repository.find({
            where: {
                content: Like(`%${query}%`)
            }
        })
    }

}

export default MessageRepository