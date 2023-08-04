import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { EViewComponentType, ViewMetaInstance } from '~/model';
import { RenderViewDivision } from './division';
import { RenderViewModal } from './modal';
import { RenderViewTabs } from './tabs';

export const RenderViewComponent = observer(({ view, children }: { view: ViewMetaInstance; children: ReactNode }) => {
  switch (view.type) {
    case EViewComponentType.Modal:
      return <RenderViewModal view={view}>{children}</RenderViewModal>;
    case EViewComponentType.Tabs:
      return <RenderViewTabs view={view}>{children}</RenderViewTabs>;
    case EViewComponentType.Division:
    default:
      return <RenderViewDivision>{children}</RenderViewDivision>;
  }
});