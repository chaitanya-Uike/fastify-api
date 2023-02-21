const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword(candidatePassword) {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    }

    static associate(models) {
      User.hasMany(models.Task);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          // setters don't allow async funcs, maybe I can use hooks for hashing instead
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
    },
    {
      sequelize,
    }
  );

  return User;
};
