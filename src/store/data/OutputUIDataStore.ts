import { makeAutoObservable } from 'mobx';

export default class OutputUIDataStore {
    title: string;

    constructor(data?: Partial<OutputUIDataStore>) {
        this.update(
            Object.assign(
                {
                    title: 'output default',
                },
                data
            )
        );
        makeAutoObservable(this, {}, { autoBind: true })
    }

    update(data: Partial<OutputUIDataStore>): void {
        Object.assign(this, data)
    }
}
