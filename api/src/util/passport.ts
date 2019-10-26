import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import Database from '@api/database';
import { AcessoUsuariosRepository } from '@api/database/repositories/acesso-usuarios';

/**
 * Essa classe define estratégia de autenticação.
 *
 * @export
 * @class Passaport
 */
export default class Passaport {

    
    /**
     * Repositório da tabela de acesso_usuario.
     *
     * @private
     * @type {AcessoUsuariosRepository}
     * @memberof Passaport
     */
    private acessoUsuariosRepository: AcessoUsuariosRepository;
    
    /**
     * Parametros da estratégia de autenticação.
     *
     * @private
     * @type {StrategyOptions}
     * @memberof Passaport
     */
    private params: StrategyOptions;

    /**
     * Inicializa a classe.
     * @memberof Passaport
     */
    public constructor() {
        this.acessoUsuariosRepository = new AcessoUsuariosRepository();
        this.params =  {
            secretOrKey: process.env['JWT_SECRET'],
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        };
    }
    /**
     * Essa funcção serve como um middleware para checar se o usuário está autenticado corretamente.
     *
     * @memberof Passaport
     */
    public use(): void {
        var strategy = new Strategy(this.params, async (payload, done): Promise<void> => {
            var user = await this.acessoUsuariosRepository.findById(payload.id);
            if (user) {
                return done(null, { id: payload.id });
            } else {
                return done(new Error('User não encontrado'), null);
            }
        });
        passport.use(strategy);
    }

    /**
     * Cria uma nova autenticação.
     *
     * @returns {void}
     * @memberof Passaport
     */
    public authenticate(): void {
        return passport.authenticate('jwt', { session: false });
    }
}