import type { Model, SortOrder, FilterQuery } from 'mongoose';

interface PaginationInput {
  nextToken?: string;
  limit: number;
}

interface PopulateOptions {
  path: string;
  model: string;
  select?: string;
  populate?: PopulateOptions;
}

export interface PaginationOptions {
  model: Model<any>;
  paginationInput: PaginationInput;
  query?: FilterQuery<any>;
  sort?: SortOrder | string | any;
  populate?: PopulateOptions[] | PopulateOptions;
}

export const paginate = async ({
  model,
  paginationInput,
  query = {},
  sort = { createdAt: -1 },
  populate = [],
}: PaginationOptions) => {
  const { nextToken, limit } = paginationInput;
  const skip = nextToken ? parseInt(nextToken, 10) : 0;

  const items = await model
    .find(query)
    .populate(populate)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const totalCount = await model.countDocuments(query);
  const newNextToken = skip + limit < totalCount ? String(skip + limit) : null;

  return {
    items,
    totalCount,
    nextToken: newNextToken,
  };
};
