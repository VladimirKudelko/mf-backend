import mongoose from '../context';

import { CategoryTypeEnum } from '../enums';

export interface CategoryDocument extends mongoose.Document {
  userId: string;
  title: string;
  type: CategoryTypeEnum;
  isDefault: boolean;
}
