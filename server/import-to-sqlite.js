const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Загружаем JSON
const data = JSON.parse(fs.readFileSync('./restored_data.json', 'utf-8'));

// Создаём БД
const db = new sqlite3.Database('messages.db');

db.serialize(() => {
    // Удаляем старые таблицы
    db.run(`DROP TABLE IF EXISTS polls`);
    db.run(`DROP TABLE IF EXISTS answers`);
    db.run(`DROP TABLE IF EXISTS tags`);

    // Таблица вопросов (polls)
    db.run(`
        CREATE TABLE polls (
                               message_id INTEGER PRIMARY KEY,
                               question TEXT,
                               total_voters INTEGER,
                               explanation TEXT
        )
    `);

    // Таблица ответов
    db.run(`
        CREATE TABLE answers (
                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 message_id INTEGER,
                                 answer_text TEXT,
                                 is_correct BOOLEAN,
                                 FOREIGN KEY (message_id) REFERENCES polls(message_id)
        )
    `);

    // Таблица тегов
    db.run(`
        CREATE TABLE tags (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              message_id INTEGER,
                              tag TEXT,
                              FOREIGN KEY (message_id) REFERENCES polls(message_id)
        )
    `);

    // Подготовленные выражения
    const insertPoll = db.prepare(`
        INSERT INTO polls (message_id, question, total_voters, explanation)
        VALUES (?, ?, ?, ?)
    `);

    const insertAnswer = db.prepare(`
        INSERT INTO answers (message_id, answer_text, is_correct)
        VALUES (?, ?, ?)
    `);

    const insertTag = db.prepare(`
        INSERT INTO tags (message_id, tag)
        VALUES (?, ?)
    `);

    // Перебор всех сообщений
    data.messages.forEach(msg => {
        const poll = msg.poll;
        if (!poll) return;

        insertPoll.run(
            msg.id,
            poll.question,
            poll.total_voters,
            poll.explanation || null
        );

        if (Array.isArray(poll.answers)) {
            poll.answers.forEach(ans => {
                insertAnswer.run(msg.id, ans.text, !!ans.correct);
            });
        }

        if (Array.isArray(msg.tags)) {
            msg.tags.forEach(tag => {
                insertTag.run(msg.id, tag);
            });
        }
    });

    // Завершаем
    insertPoll.finalize();
    insertAnswer.finalize();
    insertTag.finalize();

    console.log('✅ Данные успешно импортированы в messages.db');
});
