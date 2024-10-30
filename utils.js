
/**
 * Генерирует уникальный идентификатор для задачи.
 * @returns {string} Уникальный идентификатор
 */
export function generateUniqueId() {
    const timestamp = Date.now().toString(36);  // Текущее время в 36-й системе счисления
    const randomSuffix = Math.random().toString(36).substring(2, 8);  // Случайный суффикс
    return `${timestamp}-${randomSuffix}`;
}
