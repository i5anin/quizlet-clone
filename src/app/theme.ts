// src/app/theme.ts
import { ref, computed, watch } from 'vue'
import { darkTheme } from 'naive-ui'

const STORAGE_KEY = 'theme'

function getInitialTheme(): boolean {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(getInitialTheme())

const naiveTheme = computed(() => (isDark.value ? darkTheme : null))

function initThemeWatcher() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            isDark.value = e.matches
        }
    })

    watch(isDark, (val) => {
        localStorage.setItem(STORAGE_KEY, val ? 'dark' : 'light')
    }, { immediate: true })
}

export {
    isDark,
    naiveTheme,
    initThemeWatcher // 👈 обязательно присутствует
}
