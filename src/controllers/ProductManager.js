import { promises as fs, existsSync, writeFileSync } from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    checkFile = () => {
        !existsSync(this.path) && writeFileSync(this.path, "[]", "utf-8");
    };

    async addProduct(newProduct) {

        if (Object.values(newProduct).some(value => !value)) {
            return "Posee campos incompletos.";
        }

        this.checkFile();
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const existingProduct = products.find(prod => prod.code === newProduct.code);

        if (existingProduct) {
            return "El producto ya existe";
        }

        const newID = products.length ? products[products.length - 1].id + 1 : 1;
        products.push({ ...newProduct, id: newID });
        await fs.writeFile(this.path, JSON.stringify(products));
        return "El producto ha sido creado";
    }

    async getProducts() {
        this.checkFile();
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return products;
    }

    async getProductByID(idProduct) {
        this.checkFile();
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const product = products.find(prod => prod.id === idProduct);
        return product ? product : `El Producto ID: ${idProduct} no existe`
    }

    async updateProduct(newProduct, idProduct) {
        if (Object.values(newProduct).some(value => !value)) {
            return 'Posee campos incompletos.';
        }

        this.checkFile();
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const productIndex = products.findIndex(prod => prod.id === idProduct);

        if (productIndex === -1) {
            return `El Producto ID: ${idProduct} no existe`;
        }

        products[productIndex] = { ...newProduct, id: idProduct };
        await fs.writeFile(this.path, JSON.stringify(products));
        return `El Producto ID: ${idProduct} ha sido actualizado`;
    }

    async deleteProduct(idProduct) {
        this.checkFile();
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const productIndex = products.findIndex(prod => prod.id === idProduct);

        if (productIndex === -1) {
            return `El Producto ID: ${idProduct} no existe`
        }

        products.splice(productIndex, 1);
        await fs.writeFile(this.path, JSON.stringify(products));
        return `El producto con ID ${idProduct} ha sido eliminado`;
    }

}

export class Product {
    constructor(title, description, code, price, status, stock, category, thumbnails) {
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnails = thumbnails
    }
}