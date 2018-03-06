export abstract class BasePage {
    toJson(data: any): string {
        return data ? JSON.stringify(data) : data;
    }
}