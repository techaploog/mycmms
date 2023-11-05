import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<
  DocumentInterface extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<DocumentInterface>) {}

  async create(
    document: Omit<DocumentInterface, '_id'>,
  ): Promise<DocumentInterface> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (
      await createDocument.save()
    ).toJSON() as unknown as DocumentInterface;
  }

  async findOne(filterQuery: FilterQuery<DocumentInterface>) {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<DocumentInterface>,
    update: UpdateQuery<DocumentInterface>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery:FilterQuery<DocumentInterface>){
    return this.model.find(filterQuery,{},{lean:true});
  }

  async findOneAndDelete(filterQuery:FilterQuery<DocumentInterface>){
    return this.model.findOneAndDelete(filterQuery,{lean:true});
  }
}
