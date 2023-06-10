import {Route} from '@angular/router';
import {initialDataResolver} from 'app/app.resolvers';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {LayoutComponent} from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'exchange-rates'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'exchange-rates'},


    // Admin routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'exchange-rates', loadChildren: () => import('app/modules/landing/exchangeRates/exchange-rates.routes')},
        ]
    }
];
