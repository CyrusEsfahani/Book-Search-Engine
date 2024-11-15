import { signToken, AuthenticationError } from '../services/auth.js';
import { User } from '../models/index.js';
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).select('-__v -password');
                return user;
            }
            throw new AuthenticationError('Not authenticated');
        },
    },
    Mutation: {
        addUser: async (_parent, args) => {
            const newUser = await User.create(args);
            const token = signToken(newUser.username, newUser.email, newUser._id);
            return { token, user: newUser };
        },
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('Invalid credentials');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        saveBook: async (_parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(context.user._id, { $push: { savedBooks: bookData } }, { new: true });
                return updatedUser;
            }
            throw new AuthenticationError('Not authenticated');
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId } } }, { new: true });
                return updatedUser;
            }
            throw new AuthenticationError('Not authenticated');
        },
    },
};
export default resolvers;
