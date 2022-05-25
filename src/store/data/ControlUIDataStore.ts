import { makeAutoObservable } from 'mobx';

export default class ControlUIDataStore {
    title: string;

    constructor(data?: Partial<ControlUIDataStore>) {
        this.update(
            Object.assign(
                {
                    title: 'NodeDefaultTitle',
                },
                data
            )
        );
        makeAutoObservable(this, {}, { autoBind: true })
    }

    update(data: Partial<ControlUIDataStore>): void {
        Object.assign(this, data)
    }
}
