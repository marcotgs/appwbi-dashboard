var OneSignal = require('onesignal-node');
import cron from 'node-cron';
import { MensagemRepository, MessageData, UsuarioRepository } from '@api/database/repositories';

class Push {

    private mensagemRepository: MensagemRepository;
    private usuarioRepository: UsuarioRepository;
    private oneSignalClient: any;

    constructor() {
        this.oneSignalClient = new OneSignal.Client({
            userAuthKey: process.env.ONESIGNAL_USER_AUTH_KEY,
            app: {
                appAuthKey: process.env.ONESIGNAL_APP_AUTH_KEY,
                appId: process.env.ONESIGNAL_APP_ID
            }
        });
        this.mensagemRepository = new MensagemRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    public initCron(): void {
        const task = cron.schedule('*/30 * * * * *', () => {
            this.getMessages();
        });

        task.start();
    }

    private async getMessages(): Promise<void> {
        const messages = await this.mensagemRepository.findAllUnsent();
        if (messages.length > 0) {
            console.log('enviando mensagens...');
            const notifications = await this.createNotificationsObjects(messages);
            const promises = notifications.map((notification) => this.sendNotification(notification));
            Promise.all(promises)
                .then(async (messages) => {
                    await this.mensagemRepository.updateToSent(messages);
                    console.log('mensagens enviadas...');
                }).catch((erro) => {
                    console.log(erro);
                });
        }
    }

    private createNotificationsObjects(messages: MessageData[]): Promise<{ messageId: number, notification: any }[]> {
        return new Promise((resolve) => {
            const promises = messages.map((message) => this.createNotificatioObject(message));
            Promise.all(promises)
                .then((notifications) => {
                    resolve(notifications);
                });
        })
    }

    private async selectDevices(data: MessageData): Promise<string[]> {
        if (process.env.DEBUG_DEVICES) {
            return process.env.DEBUG_DEVICES.split(',');
        } else {
            if (data.idCadastroSetores) {
                return (await this.usuarioRepository.findAllDevicesByCompanySector(data.idCadastroSetores))
                    .map((usuario) => usuario.device);
            } else if (data.idEmpresa) {
                return (await this.usuarioRepository.findAllDevicesByCompanySector(data.idCadastroSetores))
                    .map((usuario) => usuario.device);
            } else {
                return (await this.usuarioRepository.findAllDevices())
                    .map((usuario) => usuario.device);
            }
        }
    }

    private async createNotificatioObject(data: MessageData): Promise<{ messageId: number, notification: any }> {
        const devices = await this.selectDevices(data);
        return {
            messageId: data.id,
            notification: new OneSignal.Notification({
                contents: {
                    en: data.mensagem,
                    pt: data.mensagem
                },
                headings: {
                    en: data.titulo,
                    pt: data.titulo
                },
                include_player_ids: devices
            })
        };
    }

    private sendNotification(data: { messageId: number, notification: any }): Promise<number> {
        return new Promise((resolve, reject) => {
            this.oneSignalClient.sendNotification(data.notification, (err: any) => {
                if (err) {
                    reject();
                } else {
                    resolve(data.messageId);
                }
            });
        });
    }
}

export default Push;