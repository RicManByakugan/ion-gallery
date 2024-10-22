import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'photo',
        loadChildren: () => import('../pages/photo/photo.module').then(m => m.PhotoPageModule)
      },
      {
        path: 'video',
        loadChildren: () => import('../pages/video/video.module').then(m => m.VideoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/photo',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/photo',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
