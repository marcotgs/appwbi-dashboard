import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import Database from "@api/database";
import { AcessoUsuariosRepository } from "@api/database/repositories/acesso-usuarios";

export default class Passaport {
    private acessoUsuariosRepository: AcessoUsuariosRepository;
    private params: StrategyOptions;
    public constructor() {
        this.acessoUsuariosRepository = new AcessoUsuariosRepository(Database.context);
        this.params =  {
            secretOrKey: process.env["JWT_SECRET"],
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        };
    }
    public use(): void {
        var strategy = new Strategy(this.params, async (payload, done): Promise<void> => {
            var user = await this.acessoUsuariosRepository.findById(payload.id);
            if (user) {
                return done(null, { id: payload.id });
            } else {
                return done(new Error("User não encontrado"), null);
            }
        });
        passport.use(strategy);
    }

    public authenticate(): void {
        return passport.authenticate("jwt", { session: false });
    }
}