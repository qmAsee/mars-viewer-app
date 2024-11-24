export function formatDate(dateString) {
    // Преобразуем строку в объект Date
    const date = new Date(dateString);

    // Получаем год, месяц и день
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Месяц в JavaScript начинается с 0
    const day = date.getDate();

    // Возвращаем строку в нужном формате
    return `${year}-${month}-${day}`;
}