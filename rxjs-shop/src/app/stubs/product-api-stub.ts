import { Product } from "../models/product.model";

export class ProductApiStub {
    static dummyProducts: Product[] = [
        {id: 1, category: "A", name: "Product 1"},
        {id: 2, category: "A", name: "Product 2"},
        {id: 3, category: "A", name: "Product 3"},
        {id: 4, category: "B", name: "Product 4"},
        {id: 5, category: "B", name: "Product 5"},
    ];

    static getForCategory(catName: string): Product[] {
        return [
            {id: 1, category: "A", name: "Product 1"},
            {id: 2, category: "A", name: "Product 2"},
            {id: 3, category: "A", name: "Product 3"},
        ];
    }
}