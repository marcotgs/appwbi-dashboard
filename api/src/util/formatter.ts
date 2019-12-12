export default class Formatter {
    public static removeAccents(str: string): string {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}