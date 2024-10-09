import { Product } from "../models/product.model";

export class ProductApiStub {
    static dummyProducts: Product[] = [
        {
            id: 1,
            category: "Electronics",
            name: "Smartphone",
            description: "Latest model smartphone with advanced features.",
            price: 699.99,
            imageUrl: "https://images.unsplash.com/photo-1603184017968-953f59cd2e37?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.5
        },
        {
            id: 2,
            category: "Electronics",
            name: "Laptop",
            description: "High-performance laptop for gaming and productivity.",
            price: 999.99,
            imageUrl: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.0
        },
        {
            id: 3,
            category: "Electronics",
            name: "Wireless Headphones",
            description: "Comfortable wireless headphones with noise cancellation.",
            price: 199.99,
            imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 3.5
        },
        {
            id: 4,
            category: "Home Appliances",
            name: "Air Fryer",
            description: "Healthy cooking with less oil in a compact air fryer.",
            price: 79.99,
            imageUrl: "https://plus.unsplash.com/premium_photo-1672192166833-c8ae84e5e127?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 5.0
        },
        {
            id: 5,
            category: "Home Appliances",
            name: "Vacuum Cleaner",
            description: "Powerful vacuum cleaner for deep cleaning carpets and floors.",
            price: 149.99,
            imageUrl: "https://plus.unsplash.com/premium_photo-1677362995049-1a2db590288a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.8
        },
        {
            id: 6,
            category: "Fashion",
            name: "Running Shoes",
            description: "Lightweight running shoes for ultimate comfort.",
            price: 89.99,
            imageUrl: "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.2
        }
    ];

    static getForCategory(catName: string): Product[] {
        return this.dummyProducts.filter(product => product.category === catName);
    }
}
