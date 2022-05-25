import { makeAutoObservable } from 'mobx';

export default class InputUIDataStore {
    title: string;
    isShown: boolean;

    constructor(data?: Partial<InputUIDataStore>) {
        this.update(
            Object.assign(
                {
                    title: 'input default',
                    isShown: true,
                },
                data
            )
        );
        makeAutoObservable(this, {}, { autoBind: true })
    }

    update(data: Partial<InputUIDataStore>): void {
        Object.assign(this, data)
    }
}
