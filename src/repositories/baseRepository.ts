import { Repository, EntityTarget, DeepPartial, FindOptionsWhere } from "typeorm";
import dataSource from "../dataSource";

export class BaseRepository<T> {
    repository: Repository<T>;

    constructor(repository: EntityTarget<T>) {
        this.repository = dataSource.getRepository(repository);
    }

    async getOneById(id: FindOptionsWhere<T>) {
        return await this.repository.findOneBy(id)
    }

    async getOneByUUID(uuid: FindOptionsWhere<T>) {
        return await this.repository.findBy(uuid)
    }

    async getList(skip: number, take: number) {
        return await this.repository.find({
            skip: skip,
            take: take
        })
    }

    async create(entity: DeepPartial<T>) {
        console.log("does it come here");
        return await this.repository.create(entity);
    }

    async save(entity: DeepPartial<T>) {
        return await this.repository.save(entity);
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }

    async deleteMany(ids: number[]) {
        return await this.repository.delete(ids);
    }

    async softDelete(id: number) {
        return await this.repository.softDelete(id);
    }

    async softDeleteMany(ids: number[]) {
        return await this.repository.softDelete(ids);
    }

    async softRemove(entity: DeepPartial<T>) {
        return await this.repository.softRemove(entity);
    }

    async softRemoveMany(entities: DeepPartial<T>[]) {
        return await this.repository.softRemove(entities);
    }
}
