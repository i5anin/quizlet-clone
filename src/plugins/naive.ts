// src/plugins/naive.ts
import {
    create,
    NConfigProvider,
    NCard,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NSpace,
    NList,
    NListItem,
    NThing,
    NText,
    NDivider,
    NResult,
    NGrid,
    NGi
} from 'naive-ui'

export function createNaiveUI() {
    return create({
        components: [
            NConfigProvider,
            NCard,
            NForm,
            NFormItem,
            NInput,
            NButton,
            NSpace,
            NList,
            NListItem,
            NThing,
            NText,
            NDivider,
            NResult,
            NGrid,
            NGi
        ]
    })
}
