import { Like } from 'typeorm';
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

    findMentions = async (name: string) => {
        return await this.repository.findBy({
            content: Like(name)
        })
    }

    getLatestTweets = async (username: string) => {
        return await this.repository.find({
            where: {
                name: username,
            },
            take: 10
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