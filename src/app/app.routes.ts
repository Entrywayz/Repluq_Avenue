import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryItemsComponent } from './components/category-items/category-items.component';
import { BrandResolver } from './resolvers/brand.resolver';

export const routes: Routes = [

    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'products/:id',
        component: CategoryItemsComponent,
        resolve: { items: BrandResolver }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
