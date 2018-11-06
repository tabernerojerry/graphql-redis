export default {
  Query: {
    hello: () => "Hello Jerry",

    getUsers: async (_, __, { client }) => {
      try {
        const resScan = await client.scanAsync(0, "MATCH", "*user*");

        const arrKeys = resScan[1];

        let users = await Promise.all(
          arrKeys.map(async key => {
            const res = await client.hgetallAsync(key);
            return { ...res, id: key };
          })
        );

        return users;
      } catch (err) {
        console.log(err);
      }
    },

    getUser: async (_, { id }, { client }) => {
      try {
        const res = await client.hgetallAsync(id);

        return { ...res, id };
      } catch (err) {
        console.log(err);
      }
    }
  },
  Mutation: {
    // Create and Update Record
    addUser: async (_, { input }, { client }) => {
      const { id, firstName, lastName, email, phone } = input;

      try {
        const ok = await client.hmset(id, [
          "firstName",
          firstName,
          "lastName",
          lastName,
          "email",
          email,
          "phone",
          phone
        ]);

        if (!ok) throw new Error("Something, went wrong!");

        return "User, saved successfully!";
      } catch (err) {
        console.log(err);
      }
    },

    // Remove Record
    deleteUser: async (_, { id }, { client }) => {
      try {
        const ok = await client.del(id);

        if (!ok) throw new Error("Something, went wrong!");

        return "Record, removed successfully!";
      } catch (err) {
        console.log(err);
      }
    }
  }
};
