const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Подключение к БД
const db = new sqlite3.Database('frontend_tests.db');

// Создание таблиц
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS polls (
                                                 id INTEGER PRIMARY KEY,
                                                 question TEXT NOT NULL,
                                                 date TEXT NOT NULL,
                                                 voters INTEGER,
                                                 answers TEXT
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS notes (
                                                 id INTEGER PRIMARY KEY,
                                                 date TEXT NOT NULL,
                                                 title TEXT NOT NULL,
                                                 body TEXT
            )`);
});

// Загрузка JSON
const raw = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(raw);

// Хелпер: привести msg.text к строке
function extractText(text) {
    if (typeof text === 'string') return text;
    if (Array.isArray(text)) return text.map(t => t.text).join('').trim();
    return '';
}

let pollCount = 0;
let noteCount = 0;

data.messages.forEach((msg) => {
    if (msg.type !== 'message') return;

    const date = msg.date;

    // 🎯 Опрос
    if (msg.poll) {
        const question = msg.poll.question?.trim();
        const voters = msg.poll.total_voters || 0;
        const answers = JSON.stringify(msg.poll.answers.map(a => a.text));

        if (question) {
            db.run(
                `INSERT INTO polls (id, question, date, voters, answers) VALUES (?, ?, ?, ?, ?)`,
                [msg.id, question, date, voters, answers],
                (err) => {
                    if (err) return console.error(`❌ Ошибка записи poll #${msg.id}:`, err.message);
                    pollCount++;
                }
            );
        }

        return;
    }

    // 📘 Текстовая карточка
    const fullText = extractText(msg.text);
    if (fullText.length > 0) {
        const title = fullText.split('\n')[0].slice(0, 100).trim();
        db.run(
            `INSERT INTO notes (id, date, title, body) VALUES (?, ?, ?, ?)`,
            [msg.id, date, title, fullText],
            (err) => {
                if (err) return console.error(`❌ Ошибка записи note #${msg.id}:`, err.message);
                noteCount++;
            }
        );
    }
});

db.close(() => {
    console.log(`✅ Импорт завершён: ${pollCount} опросов, ${noteCount} карточек.`);
});
