-- CreateTable
CREATE TABLE "Restaurant" (
    "restaurant_id" TEXT NOT NULL,
    "restaurant_image_url" TEXT NOT NULL,
    "restaurant_name" TEXT NOT NULL,
    "restaurant_rating" TEXT NOT NULL,
    "restaurant_location" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restaurant_id")
);
