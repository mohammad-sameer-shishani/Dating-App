import { Routes } from '@angular/router';
import { MemberList } from '../fearures/members/member-list/member-list';
import { MemberDetailed } from '../fearures/members/member-detailed/member-detailed';
import { Home } from '../features/home/home';
import { Lists } from '../fearures/lists/lists';
import { Messages } from '../fearures/messages/messages';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';

export const routes: Routes = [
    {path: '', component: Home},
    {path: '',
     runGuardsAndResolvers: 'always',
     canActivate: [authGuard],
     children: [
                {path: 'members', component: MemberList,canActivate: [authGuard]},
                {path: 'members/:id', component: MemberDetailed},
                {path: 'lists', component: Lists},
                {path: 'messages', component: Messages},
            ]},
            {path: 'errors', component: TestErrors},
            {path: 'server-error', component: ServerError},
            {path: '**', component: NotFound},
];
