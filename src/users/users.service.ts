import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User, UserDocument} from "./entities/user.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    create(createUserDto: CreateUserDto) {
        const user = new this.userModel(createUserDto);
        return user.save();
    }

    findAll() {
        return this.userModel.find();
    }

    findOne(id: string) {
        return this.userModel.findById(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate({
                _id: id
            }, {
                $set: updateUserDto
            },
            {
                new: true,
            })
        // new = true se nao botar, nao salva
    }

    remove(id: string) {
        return this.userModel.deleteOne({
            _id: id
        }).exec();

        // exec se nao, nao deleta
    }
}
