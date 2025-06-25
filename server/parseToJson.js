const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('frontend_tests.db');

const messages = [];

// Хелпер: преобразовать answers JSON в формат объектов
function parseAnswers(json) {
    try {
        const parsed = JSON.parse(json);
        return parsed.map(text => ({ text }));
    } catch {
        return [];
    }
}

db.serialize(() => {
    db.all(`SELECT * FROM polls`, (err, polls) => {
        if (err) throw err;

        polls.forEach(poll => {
            messages.push({
                id: poll.id,
                type: 'message',
                date: poll.date,
                poll: {
                    question: poll.question,
                    total_voters: poll.voters,
                    answers: parseAnswers(poll.answers),
                }
            });
        });

        db.all(`SELECT * FROM notes`, (err, notes) => {
            if (err) throw err;

            notes.forEach(note => {
                messages.push({
                    id: note.id,
                    type: 'message',
                    date: note.date,
                    text: note.body
                });
            });

            // Сортировка по ID (или дате, если нужно)
            messages.sort((a, b) => a.id - b.id);

            // Запись в JSON
            fs.writeFileSync('restored_data.json', JSON.stringify({ messages }, null, 2), 'utf8');
            console.log(`✅ Экспорт завершён: ${polls.length} опросов, ${notes.length} карточек.`);
        });
    });
});
