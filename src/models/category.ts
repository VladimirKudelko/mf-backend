import mongoose from '../context';

import { CategoryTypeEnum } from '../enums';

export interface CategoryDocument extends mongoose.Document {
  _id: string;
  userId: string;
  title: string;
  type: CategoryTypeEnum;
  icon: string;
  isDefault: boolean;
}
