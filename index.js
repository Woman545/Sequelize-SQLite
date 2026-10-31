const sequelize = require('./db');
const Car = require('./models/car');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных установлено.\n');

    await sequelize.sync({ force: true });
    console.log('Таблица cars синхронизирована.\n');

    const car1 = await Car.create({
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
      price: 2500000,
      isAvailable: true
    });

    const car2 = await Car.create({
      brand: 'BMW',
      model: 'X5',
      year: 2023,
      price: 7500000,
      isAvailable: false
    });

    console.log('Добавлены автомобили:');
    console.log(`  - ${car1.brand} ${car1.model} (${car1.year})`);
    console.log(`  - ${car2.brand} ${car2.model} (${car2.year})\n`);

    const allCars = await Car.findAll();
    
    console.log('Все автомобили в базе данных:');
    console.log('─'.repeat(60));
    
    allCars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.brand} ${car.model}`);
      console.log(`   Год: ${car.year}`);
      console.log(`   Цена: ${car.price.toLocaleString('ru-RU')} руб.`);
      console.log(`   Доступен: ${car.isAvailable ? 'Да' : 'Нет'}`);
      console.log('─'.repeat(60));
    });

  } catch (error) {
    console.error('Ошибка:', error.message);
  } finally {
    await sequelize.close();
    console.log('\n Соединение с базой данных закрыто.');
  }
}

main();