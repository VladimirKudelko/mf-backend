const defaultCategories = [
  { isDefault: true, title: 'Gifts', icon: 'gift', type: 'Incomes' },
  { isDefault: true, title: 'Salary', icon: 'coins', type: 'Incomes' },
  { isDefault: true, title: 'Savings', icon: 'piggy-bank', type: 'Incomes' },
  { isDefault: true, title: 'Food', icon: 'utensils', type: 'Expenses' },
  { isDefault: true, title: 'Health', icon: 'heartbeat', type: 'Expenses' },
  { isDefault: true, title: 'Car', icon: 'car', type: 'Expenses' },
  { isDefault: true, title: 'Clothes', icon: 'tshirt', type: 'Expenses' },
  { isDefault: true, title: 'Pets', icon: 'dog', type: 'Expenses' },
  { isDefault: true, title: 'Presents', icon: 'gift', type: 'Expenses' },
  { isDefault: true, title: 'Sport', icon: 'dumbbell', type: 'Expenses' },
  { isDefault: true, title: 'Transport', icon: 'bus-alt', type: 'Expenses' },
  { isDefault: true, title: 'Housing', icon: 'home', type: 'Expenses' },
  { isDefault: true, title: 'Hygiene', icon: 'tooth', type: 'Expenses' },
  { isDefault: true, title: 'Entertainment', icon: 'cocktail', type: 'Expenses' },
  { isDefault: true, title: 'Education', icon: 'graduation-cap', type: 'Expenses' },
];

module.exports = {
  async up(db) {
    for (const category of defaultCategories) {
      await db.collection('categories').findOneAndUpdate(
        { 'title': category.title },
        { $set: { 'isDefault': true, 'title': category.title, 'icon': category.icon, 'type': category.type } },
        { upsert: true }
      );
    }
  },

  async down(db) {
    const categoryTitles = defaultCategories.map(category => category.title);

    await db.collection('categories').deleteMany({ title: { $in: categoryTitles } })
  }
};
