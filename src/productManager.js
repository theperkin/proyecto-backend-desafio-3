import { promises as fs } from 'fs'

//Manager y producto
class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(newProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)) {
            console.error("Error 1: Campos incompletos");

        } else {
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.code === newProduct.code);

            if (!product) {
                aux.push({ ...newProduct, id: ProductManager.idGenerator() });
                await fs.writeFile(this.path, JSON.stringify(aux))

            } else {
                console.error("Error 2: Producto repetido");
            }
        }
    }

    async getProducts() {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        return aux;
    }

    async getProductByID(idProduct) {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if (product) {
            return product;
        } else {
            return null;
        }
    }

    async updateProduct(newProduct, idProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)) {
            console.error("Error 1: Campos incompletos")

        } else {
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.id === idProduct);
            if (product) {
                const indice = aux.findIndex(prod => prod.id === idProduct);
                aux[indice] = { ...newProduct, id: idProduct };
                await fs.writeFile(this.path, JSON.stringify(aux));
                console.log(`El producto (id:${idProduct}) ha sido actualizado`);
            } else {
                console.log("Error 3: Producto no encontrado");
            }
        }
    }

    async deleteProduct(idProduct) {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if (product) {
            const newArray = aux.filter(prod => prod.id !== idProduct)
            await fs.writeFile(this.path, JSON.stringify(newArray));
            console.log(`El producto (id:${idProduct}) ha sido eliminado`);
        } else {
            console.log("Error 3: Producto no encontrado");
        }
    }

    //Metodo estatico
    static idGenerator() {
        this.generatedID ? this.generatedID++ : this.generatedID = 1;
        return this.generatedID;
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

// Creacion de productos

const product1 = new Product("Nini Aretha", "Calzado", 2000, "Sin Imagen", "a0", 50);
const product2 = new Product("Llanera Arrayan", "Calzado", 3000, "Sin Imagen", "a1", 50);
const product3 = new Product("Trenia Selvatica", "Mochila", 5000, "Sin Imagen", "a2", 50);
const product4 = new Product("Lennon China 1", "Bolso", 1600, "Sin Imagen", "a3", 50);
const product5 = new Product("Chismosa Acuario", "Calzado", 3600, "Sin Imagen", "a4", 50);
const product6 = new Product("Ochenta y Seis", "Calzado", 2100, "Sin Imagen", "a5", 50);
const product7 = new Product("Nueva Roma", "Bolso", 5150, "Sin Imagen", "a6", 50);
const product8 = new Product("Llave Mora", "Bolso", 2700, "Sin Imagen", "a7", 50);

export default ProductManager;