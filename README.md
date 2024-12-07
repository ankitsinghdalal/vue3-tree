
# Vue.js Tree Management App

A Vue.js application for managing hierarchical tree structures. This app allows users to perform operations such as adding, editing, and deleting nodes in a dynamic tree, with support for validation and reactivity using Pinia and Vuelidate.

---

## Features
- Add child nodes to a tree structure dynamically.
- Edit existing nodes with a pre-filled form.
- Delete nodes from any depth of the tree.
- Reactive state management using Pinia.
- Form validation with Vuelidate.
- Sortable List
- Type-safe with TypeScript.

---

## Technologies Used

- **Vue 3** (Composition API and `<script setup>`)
- **Pinia** (State management)
- **Vuelidate** (Form validation)
- **TypeScript** (Type safety)

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**:
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**:
   Using npm:
   ```bash
   npm run dev
   ```
   Or using yarn:
   ```bash
   yarn dev
   ```

4. **Open the app**:
   - The development server will usually run at `http://localhost:5173` (check your terminal for the exact URL).

---

## Project Structure
- **`src/components`**: Contains Vue components like the list, popup form, and layout components.
- **`src/assets`**: Static assets such as images or fonts.
- **`tailwind.config.js`**: Configuration for Tailwind CSS.

---

## Scripts
- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run serve`**: Serves the production build locally.

---

## Usage

### Adding a Node
1. Click on a parent node to open the context menu.
2. Select "Add Child" and fill out the form.

### Editing a Node
1. Click on a parent node to open the context menu.
2. Select "Edit" to update the node's name.

### Deleting a Node
1. Click on a parent node to open the context menu.
2. Select "Delete" to remove the node.

### Drag n Drop
1. Click and hold any node and move to drop.

---

## Customization

### Changing Styling
The project uses Tailwind CSS. Modify `tailwind.config.js` or add classes directly in templates to change the design.

### Adding New Features
1. Add new components in the `src/components` folder.
2. Import and register them in `App.vue` or appropriate parent components.

---

## Known Issues
- Validation may need to be extended for more complex scenarios.
- Add error handling for server actions (if integrated).

---

## Dependencies
Key dependencies used in the project:
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vuelidate](https://vuelidate-next.netlify.app/)

---

## Contributing
Feel free to fork this repository and submit pull requests for any improvements or fixes.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any questions or feedback, please open an issue or contact the project maintainer.
