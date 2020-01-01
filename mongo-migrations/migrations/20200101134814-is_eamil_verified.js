module.exports = {
  async up(db) {
    await db.collection('users').updateMany(
      { isEmailVerified: { $exists : false } },
      { $set: { isEmailVerified: false } }
    );
  },

  async down(db) {
    await db.collection('users').updateMany(
      { isEmailVerified: { $exists : true } },
      { $unset: { isEmailVerified: '' } }
    );
  }
};
