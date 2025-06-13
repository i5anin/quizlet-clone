// src/plugins/naive.ts
import {
    create,
    NConfigProvider,
    NGlobalStyle,
    NButton,
    NCard,
    NInput,
    NForm,
    NFormItem,
    NDivider,
    NThing
} from 'naive-ui'

export function createNaiveUI() {
    return create({
        components: [
            NConfigProvider,
            NGlobalStyle,
            NButton,
            NCard,
            NInput,
            NForm,
            NFormItem,
            NDivider,
            NThing
        ]
    })
}
