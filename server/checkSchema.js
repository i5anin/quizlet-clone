require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY // ✅ service_role или anon
);

(async () => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false }); // опционально: последние сверху

    if (error) {
        console.error('❌ Ошибка при получении данных:', error.message);
        if (error.details) console.error('ℹ️ Подробности:', error.details);
        return;
    }

    if (!data || data.length === 0) {
        console.warn('⚠️ Данные не найдены в таблице "messages"');
        return;
    }

    console.log('✅ Получены данные:');
    console.dir(data, { depth: null });
})();
