import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongoSchema, Document } from 'mongoose';
import { hash, genSalt } from 'bcryptjs';
import { Transaction, TransactionWithStock } from './transaction.schema';

@Schema({ _id: true, timestamps: true })
export class User extends Document {
  @Prop({ type: MongoSchema.Types.String, required: true, unique: true })
  name: string;

  @Prop({ type: MongoSchema.Types.String, required: true, unique: true })
  mail: string;

  @Prop({ type: MongoSchema.Types.String, required: true })
  password: string;

  @Prop({ type: [Transaction], default: [] })
  transactions: Transaction[];
}

export interface UserWithStock extends Omit<User, 'transactions'> {
  transactions: TransactionWithStock[]
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre(
  'save',
  async function (this: User, next: (err?: Error | undefined) => void) {
    if (!this.isModified('password')) {
      return next();
    }

    try {
      const salt = await genSalt();

      this.password = await hash(this.password, salt);

      next();
    } catch (error) {
      return next(error);
    }
  },
);

export { UserSchema };
