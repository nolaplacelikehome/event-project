import mongoose from "mongoose";
import { Password } from "../helpers/password";

interface UserCreateTypes {
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserTypes> {
	build(user: UserCreateTypes): UserTypes;
}

interface UserTypes extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.pre('save', async function(done) {
	if (this.isModified('password')) {
		const hashed = await Password.hashPassword(this.get('password'));
		this.set('password', hashed);
	}

	done();
});

userSchema.statics.build = (user) => {
	return new User(user);
}

const User = mongoose.model<UserTypes, UserModel>('User', userSchema);

export { User };