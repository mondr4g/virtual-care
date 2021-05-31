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
exports.gamesController = void 0;
const database_1 = require("../database");
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * FROM games");
            });
            res.json(games);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.connect().then((conn) => {
                return conn.query("INSERT INTO games set ?", [req.body]);
            });
            res.json('Juego guardado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.connect().then((conn) => {
                return conn.query("DELETE FROM games WHERE id = ?", [id]);
            });
            res.json({ message: "Juego eliminado " });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.connect().then((conn) => {
                return conn.query("UPDATE games set ? WHERE id = ?", [req.body, id]);
            });
            res.json({ text: "Juego actualizado" });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const g = yield database_1.connect().then((conn) => {
                return conn.query("SELECT * FROM games WHERE id = ?", [id]);
            });
            if (g.length > 0) {
                return res.json(g[0]);
            }
            res.status(404).json({ text: "juego no existe" });
        });
    }
}
exports.gamesController = new GamesController();
