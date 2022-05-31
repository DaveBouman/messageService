import { Between, In, LessThan, Like, MoreThan } from 'typeorm';
import { Message } from '../entities/database/message';
import { BaseRepository } from './baseRepository';

class MessageRepository extends BaseRepository<Message> {



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

        const date = new Date;

        return await this.repository.find({
            select: {
                content: true
            },
            where: {
                content: Like(`%#%`)
            }
        })
    }

    getFollowing = async (userId: string[]) => {
        const following = await this.repository.find({
            where: {
                userId: In(userId)
            }
        })
        return following;
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