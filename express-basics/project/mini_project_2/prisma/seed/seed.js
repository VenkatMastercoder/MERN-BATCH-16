const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const restaurantData = [
  {
    restaurant_id: "a9204bfc-0c86-4a3d-b989-0b94c0739ae4",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/1/15/ef2b55a4-4b44-4c0e-8109-13291b6cc1f5_644303.jpg",
    restaurant_name: "A2B - Adyar Ananda Bhavan",
    restaurant_rating: "4.5 • 25-30 mins",
    restaurant_location: "South Indian, Sweets, Chinese Kilpauk"
  },
  {
    restaurant_id: "b8315d7c-e91a-4c2d-a5b1-9c2f87e62a5d",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e33e1d3ba7d6b2bb0d45e1001b731fcf.jpg",
    restaurant_name: "Sangeetha Veg Restaurant",
    restaurant_rating: "4.3 • 20-25 mins",
    restaurant_location: "South Indian, North Indian, Chinese T Nagar"
  },
  {
    restaurant_id: "c7429e8f-1d5b-48a3-9e6c-8d7f1b5c3a2e",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4.jpg",
    restaurant_name: "Saravana Bhavan",
    restaurant_rating: "4.4 • 30-35 mins",
    restaurant_location: "South Indian, North Indian Anna Nagar"
  },
  {
    restaurant_id: "d6538b2a-7f9c-4e1d-8b0a-5e3c9f2d1b4c",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/56c9ab92bd79745fd152a30fa2525426.jpg",
    restaurant_name: "Bombay Brasserie",
    restaurant_rating: "4.2 • 35-40 mins",
    restaurant_location: "North Indian, Mughlai, Desserts Nungambakkam"
  },
  {
    restaurant_id: "e5427d1b-8e6a-4f3c-9d2e-7a1b6c8d9f0a",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/89fccaa76f2f760e2742b9e53d32bb69.jpg",
    restaurant_name: "Behrouz Biryani",
    restaurant_rating: "4.1 • 40-45 mins",
    restaurant_location: "Biryani, Mughlai, Lucknowi Adyar"
  },
  {
    restaurant_id: "f4316c2a-9d5b-4e2f-8c7a-6b5d4e3f2a1c",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/cd832b6167eb9f88aeb1ccdebf38d942.jpg",
    restaurant_name: "Thalappakatti Restaurant",
    restaurant_rating: "4.0 • 30-35 mins",
    restaurant_location: "Biryani, Chettinad, Tandoor Velachery"
  },
  {
    restaurant_id: "g3205d1c-8b4a-4f2e-9c3b-7a6d5e4f3a2b",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/bdcd233971b7c81bf77e1fa4471280eb.jpg",
    restaurant_name: "Subway",
    restaurant_rating: "3.9 • 25-30 mins",
    restaurant_location: "Healthy Food, Salads, Snacks Mylapore"
  },
  {
    restaurant_id: "h2194e0d-7c3b-4e1f-8d2a-6b5c4d3f2a1b",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f01666ac73626461d7455d9c24005cd4.jpg",
    restaurant_name: "Paradise Biryani",
    restaurant_rating: "4.3 • 35-40 mins",
    restaurant_location: "Biryani, Hyderabadi, Kebabs Porur"
  },
  {
    restaurant_id: "i1083f9e-6b2a-4d1c-7b0a-5e4c3f2d1b4a",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/iivuhjc2mswi9lublktf.jpg",
    restaurant_name: "Domino's Pizza",
    restaurant_rating: "4.2 • 30-35 mins",
    restaurant_location: "Pizzas, Italian, Pastas Vadapalani"
  },
  {
    restaurant_id: "j0972e8d-5a1b-3c0e-6a9b-4d3c2e1f0a9b",
    restaurant_image_url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/ee5f8e06b300efc07cd8577c53311137.jpg",
    restaurant_name: "Anjappar",
    restaurant_rating: "4.0 • 30-40 mins",
    restaurant_location: "Chettinad, Biryani, Tandoor Egmore"
  }
];

async function main() {
  console.log('Start seeding...');
  
  for (const restaurant of restaurantData) {
    const result = await prisma.restaurant.upsert({
      where: { restaurant_id: restaurant.restaurant_id },
      update: restaurant,
      create: restaurant,
    });
    console.log(`Created restaurant with ID: ${result.restaurant_id}`);
  }
  
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
