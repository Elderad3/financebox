import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const ROUTES: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'contaMain', loadChildren: () => import('./pages/conta/conta-main/conta-main.module').then(m => m.ContaMainModule) },
  { path: 'categoriaMain', loadChildren: () => import('./pages/categoria/categoria-main/categoria-main.module').then(m => m.CategoriaMainModule) },
  { path: 'transacaoMain', loadChildren: () => import('./pages/transacao/transacao-main/transacao-main.module').then(m => m.TransacaoMainModule) },
  { path: 'resumoMain', loadChildren: () => import('./pages/resumo/resumo-main/resumo-main.module').then(m => m.ResumoMainModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
