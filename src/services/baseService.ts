import { DeepPartial, EntityTarget } from "typeorm";
import { BaseRepository } from "../repositories/baseRepository";

class BaseService<T> {

    constructor(entityType: EntityTarget<T>,
        private baseRepository = new BaseRepository(entityType)) { }

    async getOneById(id: number) {
        return await this.baseRepository.getOneById(id);
    }

    async getOneByUUID(uuid: string) {
        return await this.baseRepository.getOneByUUID(uuid);
    }

    async getList(skip: number, take: number) {
        return await this.baseRepository.getList(skip, take);
    }

    async create(entity: DeepPartial<T>) {
        return await this.baseRepository.create(entity);
    }

    async save(entity: DeepPartial<T>) {
        return await this.baseRepository.save(entity);
    }

    async delete(id: number) {
        return await this.baseRepository.delete(id);
    }

    async deleteMany(ids: number[]) {
        return await this.baseRepository.deleteMany(ids);
    }

    async softDelete(id: number) {
        return await this.baseRepository.softDelete(id);
    }

    async softDeleteMany(ids: number[]) {
        return await this.baseRepository.softDeleteMany(ids);
    }

    async softRemove(entity: DeepPartial<T>) {
        return await this.baseRepository.softRemove(entity);
    }

    async softRemoveMany(entities: DeepPartial<T>[]) {
        return await this.baseRepository.softRemoveMany(entities);
    }

}

export default BaseService