// 📌 Добавление тегов на основе содержимого poll.question
const fs = require('fs');
const path = require('path');

// Ключевые слова для тегов
const keywords = [
    'React', 'Vue', 'Angular', 'Svelte',
    'JavaScript', 'HTML', 'CSS', 'TypeScript',
    'Virtual DOM', 'Shadow DOM',
    'стрелочные функции', 'let', 'var', 'const',
    'Promise', 'async', 'await', 'setTimeout',
    'замыкание', 'hoisting', 'event loop', 'callback',
    'this', 'bind', 'call', 'apply',
    'localStorage', 'sessionStorage', 'cookies',
    'fetch', 'XMLHttpRequest', 'CORS',
    'DOM', 'BOM', 'Web API',
    'Node.js', 'Express', 'npm', 'yarn',
    'Webpack', 'Vite', 'Babel', 'ESLint',
    'JSON', 'AJAX', 'REST', 'API',
    'SSR', 'CSR', 'SPA', 'MVC',
    'компоненты', 'состояние', 'props', 'state',
    'hooks', 'useState', 'useEffect', 'context',
    'Jest', 'Mocha', 'unit test', 'integration test'
];

// Путь к исходному файлу
const inputPath = path.join(__dirname, 'restored_data.json');
const outputPath = path.join(__dirname, 'restored_data.json');

// Чтение исходного JSON
const raw = fs.readFileSync(inputPath, 'utf-8');
const data = JSON.parse(raw);

// Обработка сообщений
data.messages.forEach((msg) => {
    const question = msg.poll?.question || '';
    const tags = keywords.filter(keyword => question.includes(keyword));
    if (tags.length > 0) {
        msg.tags = tags;
    }
});

// Сохранение результата
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');

console.log('✅ Теги добавлены. Сохранено в restored_data.json');
