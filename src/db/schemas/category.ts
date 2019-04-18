import mongoose from '../../context';
import { CategoryDocument } from '../../models';
import { CategoryTypeEnum } from '../../enums';

const categorySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [ CategoryTypeEnum.Expenses, CategoryTypeEnum.Incomes ]
  },
  icon: {
    type: String,
    default: ''
  },
  isDefault: {
    type: Boolean,
    default: false,
  }
}, { versionKey: false });

export default mongoose.model<CategoryDocument>('category', categorySchema);
