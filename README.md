# AngularDynamicDataFilteringApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Angular Product Catalog Documentation

## Introduction:
The Angular Product Catalog is a web application developed to display and filter a large dataset of fictional products. This documentation provides an overview of the application's features, architecture, and implementation details.

## Data Source:
The dataset used in the application consists of at least 1000 records of fictional products. Each product includes attributes such as name, category, price, and other relevant details. The dataset was generated using Mockaroo (https://www.mockaroo.com/) to ensure diversity and realism.

## Angular App:
The Angular Product Catalog is built using Angular, a popular TypeScript-based web application framework. The project structure follows Angular's recommended best practices to ensure cleanliness, maintainability, and scalability. Below is a high-level overview of the project structure:

src/: Contains the source code of the Angular application.

app/: Contains the application-specific components, services, and modules.

components/: Contains Angular components responsible for UI presentation.

product-list/: Contains the product list component responsible for displaying the dataset in a table format and handling filtering operations.

product-filter/: Contains the product filter component responsible for providing advanced filtering options.

models/: Contains TypeScript interfaces representing the data models used in the application.

services/: Contains Angular services responsible for fetching data and handling filtering logic.

shared/: Contains shared modules, components, directives, and pipes used across the application.

assets/: Contains static assets such as images, icons, and CSS files.

environments/: Contains environment-specific configuration files.

## Data Display:
The dataset is displayed in a table format using the product list component. Pagination is implemented to handle a large dataset efficiently, ensuring optimal performance and user experience. Each row in the table displays product details, including name, category, price, and other relevant information.

## Filtering:
The application provides advanced filtering options for users to refine the displayed data. Filtering criteria include product category, price range, and any additional relevant criteria. Angular Forms are utilized to create a user-friendly filtering interface, allowing users to easily adjust filter criteria.

## Filter Logic:
A logic engine is implemented to handle the filtering operations. As users adjust filter criteria through the UI, the filtered data updates in real-time, providing instant feedback and ensuring a seamless user experience. The filter logic is encapsulated within Angular services, promoting code reusability and maintainability.

## Performance Optimization:
The Angular Product Catalog is optimized for performance, particularly considering the large dataset. Various techniques are employed to ensure responsiveness during filtering operations, including efficient data fetching, pagination, and lazy loading where applicable. Additionally, Angular's change detection mechanism is optimized to minimize unnecessary DOM updates and improve rendering performance.

## Conclusion:
The Angular Product Catalog is a robust web application designed to efficiently display and filter a large dataset of fictional products. With its clean architecture, advanced filtering options, and performance optimization techniques, the application provides users with a seamless and responsive experience when exploring and refining product data.




