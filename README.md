![Listner](https://raw.githubusercontent.com/Arcnnis/arcnnis-storage/main/github/listner.png)

![GitHub License](https://img.shields.io/github/license/outroninja/listner) ![NPM Version](https://img.shields.io/npm/v/listner) ![NPM Downloads](https://img.shields.io/npm/dy/listner)

Listner is a powerful and easy-to-use module designed for creating and managing lists efficiently. Whether you're dealing with simple arrays or complex datasets, Listner provides a set of intuitive operations to help you manage your data effectively.

## Features
- Easy list creation and management
- Support for multiple data types
- Efficient search and update operations
- Lighweight and minimal setup

## Getting Started
### Installation
To get started with Listner, install it via npm:
```bash
npm install listner
```
Or if you prefer using Yarn:
```bash
yarn add listner
```

### Usage
Here's a quick example to get you started:
```ts
import { ListManager } from "listner";

// Define the interface for list items (Optional)
interface Person {
    name: string;
    age: number;
    sex?: "male" | "female"
}

// Create a new ListManager instance
const list = new ListManager<Person>();

list.insertMultiple([
    { name: "John", age: 20 },
    { name: "Jane", age: 18, sex: "female" }
])

// Display all items
console.log(list.getAll());

// Update an item
list.searchAndUpdate({ name: "John" }, { age: 35 });

// Display updated list
console.log(list.getAll());
```

## Documentation
For more detailed documentation, visit [Listner Documentation](https://listner.vercel.app).

## Contributing
Contributions are always welcome! Please read the [contribution guidelines](https://github.com/outroninja/listner/CONTRIBUTING)

## License
MIT License. See the [LICENSE](https://github.com/outroninja/listner/blob/master/LICENSE) file.