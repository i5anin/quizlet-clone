const fs = require('fs');
const path = require('path');
const { stringify } = require('csv-stringify/sync');

// 📌 Входной и выходной файл
const INPUT_FILE = path.join(__dirname, 'restored_data.json');
const OUTPUT_FILE = path.join(__dirname, 'messages.csv');

// ✅ Чтение и разбор JSON
const raw = fs.readFileSync(INPUT_FILE, 'utf-8');
const { messages } = JSON.parse(raw);

// ✅ Преобразование
const rows = messages.map(msg => ({
    id: msg.id,
    created_at: msg.date,
    question: msg.poll?.question || '',
    explanation: msg.poll?.explanation || '',
    tags: JSON.stringify(msg.tags || []),
    type: msg.type,
    answers: JSON.stringify(msg.poll?.answers || [])
}));

// ✅ Формируем CSV
const csv = stringify(rows, {
    header: true,
    columns: ['id', 'created_at', 'question', 'explanation', 'tags', 'type', 'answers']
});

// ✅ Сохраняем
fs.writeFileSync(OUTPUT_FILE, csv, 'utf-8');
console.log('✅ messages.csv успешно создан.');
