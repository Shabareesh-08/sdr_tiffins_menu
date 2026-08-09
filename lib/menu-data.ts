export const categories = [
  "Tiffins",
  "Chaat",
  "Pav Bhaji",
  "Sandwiches",
  "Pizzas",
  "Fruit Juices",
  "Milkshakes",
  "Fruit Bowls",
] as const;

export type CategoryName = (typeof categories)[number];

export type MenuItem = {
  name: string;
  price: number;
  hero?: true;
};

export type MenuSubsection = {
  title: string;
  items: readonly MenuItem[];
};

export type MenuCategory = {
  note?: string;
  subsections: readonly MenuSubsection[];
};

export const menu = {
  Tiffins: {
    subsections: [
      {
        title: "Idlys",
        items: [
          { name: "Idly", price: 60 },
          { name: "Ghee Idly", price: 90 },
          { name: "Ghee Karam Idly", price: 90 },
          { name: "Ghee Podi Idly", price: 90 },
          { name: "Sambar Idly", price: 80 },
          { name: "Ghee Sambar Idly", price: 100 },
          { name: "Tawa Idly", price: 90 },
        ],
      },
      {
        title: "Traditional Dosas",
        items: [
          { name: "Plain Dosa", price: 60 },
          { name: "Onion Dosa", price: 70 },
          { name: "Aloo Masala Dosa", price: 70 },
          { name: "Upma Dosa", price: 70 },
          { name: "Ghee Aloo Masala Dosa", price: 100 },
          { name: "Ghee Upma Dosa", price: 90 },
          { name: "Plain Ghee Dosa", price: 100 },
          { name: "Ghee Karam Dosa", price: 100, hero: true },
          { name: "Ghee Podi Dosa", price: 100 },
          { name: "Uthappam", price: 90 },
          { name: "Ghee Uthappam", price: 120 },
        ],
      },
      {
        title: "Signature Dosas",
        items: [
          { name: "Aloo Masala Cheese Dosa", price: 100 },
          { name: "Butter Masala Dosa", price: 100 },
          { name: "Paneer Butter Masala Dosa", price: 130 },
          { name: "Schezwan Dosa", price: 100 },
          { name: "Schezwan Cheese Dosa", price: 120 },
          { name: "Schezwan Paneer Dosa", price: 120 },
          { name: "Sweet Corn Dosa", price: 100 },
          { name: "Sweet Corn Cheese Dosa", price: 120 },
          { name: "Sweet Corn Paneer Dosa", price: 120 },
          { name: "Pizza Dosa", price: 140, hero: true },
          { name: "Teen Maar Dosa", price: 140 },
          { name: "Special Fusion Dosa", price: 140 },
          { name: "Butter Paneer Cheese Dosa", price: 160 },
        ],
      },
      {
        title: "Mysore Bondas",
        items: [
          { name: "Mysore Bonda", price: 60 },
          { name: "Tawa Mysore Bonda", price: 90 },
        ],
      },
      {
        title: "Vadas",
        items: [
          { name: "Vada", price: 60 },
          { name: "Sambar Vada", price: 90 },
          { name: "Tawa Vada", price: 100 },
        ],
      },
      {
        title: "Puri (Mornings Only)",
        items: [{ name: "Puri with Aloo Curry", price: 70 }],
      },
    ],
  },

  Chaat: {
    subsections: [
      {
        title: "Chaat",
        items: [
          { name: "Samosa Ragada", price: 90, hero: true },
          { name: "Papdi Ragada", price: 90 },
          { name: "Cutlet Ragada", price: 90 },
          { name: "Kachori Ragada", price: 90 },
          { name: "Aloo Toast", price: 60 },
          { name: "Tawa Paneer Tikka", price: 110 },
          { name: "Pani Puri", price: 40, hero: true },
          { name: "Bhel Puri", price: 70 },
          { name: "Sev Puri", price: 70 },
          { name: "Masala Puri", price: 70 },
          { name: "Vada Pav", price: 80 },
          { name: "Cheese Vada Pav", price: 100 },
          { name: "Dabeli", price: 80 },
          { name: "Cheese Dabeli", price: 100 },
        ],
      },
      {
        title: "Dahi Chaat",
        items: [
          { name: "Dahi Puri", price: 90 },
          { name: "Dahi Papdi", price: 90 },
          { name: "Dahi Samosa", price: 90 },
          { name: "Dahi Kachori", price: 90 },
          { name: "Dahi Cutlet", price: 90 },
        ],
      },
    ],
  },

  "Pav Bhaji": {
    subsections: [
      {
        title: "Pav Bhajis",
        items: [
          { name: "Butter Pav Bhaji", price: 110 },
          { name: "Cheese Pav Bhaji", price: 140, hero: true },
          { name: "Paneer Pav Bhaji", price: 140 },
          { name: "Masala Pav Bhaji", price: 140 },
          { name: "Cheese Masala Pav Bhaji", price: 160 },
          { name: "Extra Pav", price: 50 },
          { name: "Extra Bhaji", price: 70 },
        ],
      },
    ],
  },

  Sandwiches: {
    subsections: [
      {
        title: "Sandwiches",
        items: [
          { name: "Veg Sandwich", price: 60 },
          { name: "Simple Kids Sandwich", price: 60 },
          { name: "Veg 3 Layer Sandwich", price: 80 },
          { name: "Cold Veggies Sandwich", price: 90 },
          { name: "Veg Grilled Sandwich", price: 100 },
          { name: "Tandoori Veg Grilled Sandwich", price: 100 },
          { name: "Veg Cheese Grilled Sandwich", price: 110 },
          { name: "Capsicum Corn Sandwich", price: 100 },
          { name: "Cheese Chilli Sandwich", price: 100 },
          { name: "Tawa Sandwich", price: 100 },
          { name: "Tawa Cheese Sandwich", price: 110 },
          { name: "Bombay Grilled Sandwich", price: 100 },
          { name: "Bombay Cheese Grilled Sandwich", price: 110 },
          { name: "Paneer Tikka Sandwich", price: 130 },
          { name: "Makhani Paneer Grilled Sandwich", price: 130 },
          { name: "Tandoori Paneer Sandwich", price: 130 },
          { name: "Pizza Sandwich", price: 160 },
        ],
      },
    ],
  },

  Pizzas: {
    note: 'All Pizzas Are 8" In Size',
    subsections: [
      {
        title: "Pizzas",
        items: [
          { name: "Plain Cheese Pizza", price: 160 },
          { name: "Veggie Cheese Pizza", price: 180 },
          { name: "BBQ Veggies Pizza", price: 180 },
          { name: "Veg Double Cheese Pizza", price: 200 },
          { name: "Sweet Corn Pizza", price: 220 },
          { name: "Paneer Tikka Pizza", price: 240, hero: true },
          { name: "Makhani Paneer Pizza", price: 240 },
          { name: "Tandoori Paneer Pizza", price: 240 },
          { name: "Supreme Pizza", price: 240 },
          { name: "Pataka Pizza", price: 260 },
        ],
      },
    ],
  },

  "Fruit Juices": {
    subsections: [
      {
        title: "Fruit Juices",
        items: [
          { name: "Apple Juice", price: 70 },
          { name: "Pineapple Juice", price: 70 },
          { name: "Mosambi Juice", price: 70 },
          { name: "Orange Juice", price: 80 },
          { name: "Watermelon Juice", price: 70 },
          { name: "Papaya Juice", price: 70 },
          { name: "Muskmelon Juice", price: 70 },
          { name: "Black Grapes Juice", price: 70 },
          { name: "Anar Juice", price: 90 },
        ],
      },
      {
        title: "Seasonal Delicacies",
        items: [
          { name: "Sapota Juice", price: 80 },
          { name: "Mango Juice", price: 80 },
          { name: "Mango Milkshake", price: 90 },
          { name: "Sitaphal Milkshake", price: 100 },
          { name: "Strawberry Milkshake", price: 80 },
          { name: "Faluda", price: 100, hero: true },
          { name: "Fruit Custard", price: 90 },
        ],
      },
    ],
  },

  Milkshakes: {
    subsections: [
      {
        title: "Milkshakes",
        items: [
          { name: "Apple Milkshake", price: 90 },
          { name: "Banana Milkshake", price: 70 },
          { name: "Muskmelon Milkshake", price: 90 },
          { name: "Sapota Milkshake", price: 90 },
          { name: "Fruit Punch Milkshake", price: 90 },
          { name: "Chocolate Milkshake", price: 120 },
          { name: "Oreo Milkshake", price: 120 },
          { name: "Butterscotch Milkshake", price: 120 },
          { name: "Brownie Milkshake", price: 140, hero: true },
        ],
      },
    ],
  },

  "Fruit Bowls": {
    subsections: [
      {
        title: "Fruit Bowls",
        items: [
          { name: "Mixed Fruit Bowl", price: 80, hero: true },
          { name: "Watermelon Bowl", price: 60 },
          { name: "Papaya Bowl", price: 60 },
          { name: "Pineapple Bowl", price: 60 },
          { name: "Muskmelon Bowl", price: 60 },
        ],
      },
    ],
  },
} as const satisfies Record<CategoryName, MenuCategory>;
