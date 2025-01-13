"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entities/Usuario");
const passwordService_1 = require("./passwordService");
const migratePasswords = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
    const users = yield userRepository.find();
    for (const user of users) {
        const hashedPassword = yield (0, passwordService_1.encryptPassword)(user.contrasenna);
        user.contrasenna = hashedPassword;
        yield userRepository.save(user);
    }
});
migratePasswords();
