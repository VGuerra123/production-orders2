# Production Orders – Mini Fullstack Challenge

Este proyecto es mi implementación del **Mini Fullstack Challenge** para la gestión de órdenes de producción.  
El objetivo fue construir un feature sencillo de punta a punta con **NestJS (backend)** y **Next.js (frontend)**, cumpliendo con los requerimientos técnicos y de usabilidad en el menor tiempo posible.

---

## 🚀 Tecnologías utilizadas
- **Backend:** NestJS + TypeScript
- **Frontend:** Next.js (con App Router) + TypeScript
- **UI:** Ant Design
- **Tests:** Jest + Testing Library

---

## 📦 Backend (NestJS)

### Funcionalidades
- Endpoint **POST `/api/production-orders`**  
  - Crea una orden con los campos requeridos: `reference`, `product`, `quantity`, `dueDate`.  
  - Asigna automáticamente `id` (UUID), `status` = `"planned"` por defecto, y `createdAt` en formato ISO.  
  - Valida entradas: strings no vacíos, `quantity > 0`, fecha válida.

- Endpoint **GET `/api/production-orders`**  
  - Retorna todas las órdenes creadas en memoria (sin DB).  
  - Filtro opcional por `status` (`planned | scheduled | in_progress | completed`).

### Tests backend
- Incluí un test unitario simple para el servicio: crear una orden y verificar que luego aparece en la lista.  
  Esto da confianza en la funcionalidad principal sin sobrecargar con tests innecesarios.

### Scripts backend
```bash
npm run backend:dev   # Levanta el servidor NestJS en http://localhost:3001/api
npm run test:backend  # Ejecuta los tests del backend
