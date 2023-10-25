const { PrismaClient } = require('@prisma/client');

const users = [
  { role: 'VALET', name: 'John Doe', phoneNumber: '111-111-1111' },
  { role: 'CLIENT', name: 'Jane Smith', phoneNumber: '111-111-1112' },
  { role: 'VALET', name: 'Robert Johnson', phoneNumber: '111-111-1113' },
  { role: 'CLIENT', name: 'Emily White', phoneNumber: '111-111-1114' },
  { role: 'VALET', name: 'Chris Lee', phoneNumber: '111-111-1115' },
  { role: 'CLIENT', name: 'Nancy Davis', phoneNumber: '111-111-1116' },
  { role: 'VALET', name: 'Paul Brown', phoneNumber: '111-111-1117' },
  { role: 'CLIENT', name: 'Lisa Miller', phoneNumber: '111-111-1118' },
  { role: 'VALET', name: 'Michael Taylor', phoneNumber: '111-111-1119' },
  { role: 'CLIENT', name: 'Linda Wilson', phoneNumber: '111-111-1120' }
];

const restaurants = [
  { name: 'The Tasty Spoon', ticketPrice: "16" },
  { name: 'Spicy Dreams', ticketPrice: "10" },
  { name: 'Ocean Bites', ticketPrice: "17" },
  { name: 'Gourmet Galaxy', ticketPrice: "12" },
  { name: 'Urban Flavors', ticketPrice: "25" },
  { name: 'Hearty Homestyle', ticketPrice: "34" },
  { name: 'Savory Symphony', ticketPrice: "14" },
  { name: 'Mystical Morsels', ticketPrice: "18" },
  { name: 'Rustic Radiance', ticketPrice: "20.5" },
  { name: 'Epicurean Echoes', ticketPrice: "17.4" }
];

const tickets = [
  { userId: 1, restaurantId: 1, scannedAt: '2023-01-01T12:00:00Z' },
  { userId: 2, restaurantId: 2, scannedAt: '2023-01-02T12:30:00Z' },
  { userId: 3, restaurantId: 3, scannedAt: '2023-01-03T13:00:00Z' },
  { userId: 4, restaurantId: 4, scannedAt: '2023-01-04T13:30:00Z' },
  { userId: 5, restaurantId: 5, scannedAt: '2023-01-05T14:00:00Z' },
  { userId: 6, restaurantId: 6, scannedAt: '2023-01-06T14:30:00Z' },
  { userId: 7, restaurantId: 7, scannedAt: '2023-01-07T15:00:00Z' },
  { userId: 8, restaurantId: 8, scannedAt: '2023-01-08T15:30:00Z' },
  { userId: 9, restaurantId: 9, scannedAt: '2023-01-09T16:00:00Z' },
  { userId: 10, restaurantId: 10, scannedAt: '2023-01-10T16:30:00Z' },
];

const prisma = new PrismaClient();


async function main() {

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.session.deleteMany();

  const usersCreate = []
  for (const user of users) {
    const newUser = await prisma.user.create({
      data: user,
    });
    usersCreate.push(newUser);
  }

  // Créer 10 restaurants
  const restaurantsCreate = []
  for (const restaurant of restaurants) {
    const newRestaurant = await prisma.restaurant.create({
      data: restaurant,
    });
    restaurantsCreate.push(newRestaurant);
  }

  // Créer 10 tickets
  // const ticketsCreate = []
  // for (const ticket of tickets) {
  //   const newTicket = await prisma.ticket.create({
  //     data: ticket,
  //   });
  //   ticketsCreate.push(newTicket);
  // }

  console.log('Users:', usersCreate);
  console.log('Restaurants:', restaurantsCreate);

  console.log('Users:', usersCreate);
  console.log('Restaurants:', restaurantsCreate);
}

main ()
  .catch((e) => {
    console.log("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
