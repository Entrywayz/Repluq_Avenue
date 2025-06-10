import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryItemsComponent } from './components/category-items/category-items.component';
import { BrandResolver } from './resolvers/brand.resolver';
import { ItemDescComponent } from './components/item-desc/item-desc.component';
import { UserPageComponent } from './components/user-page/user-page.component';

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
        path: 'products/product/:id',
        component: ItemDescComponent,
    },    
    {
        path: 'user',
        component: UserPageComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },

];
