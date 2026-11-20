import type { Route } from './+types/info';
import { seo } from '@/lib/seo';
import { infoPages, type InfoPageKey } from '@/data/info-pages';
import { InfoContent } from '@/components/info/info-content';
export function loader({ params }: Route.LoaderArgs) {
  if (!params.page || !Object.prototype.hasOwnProperty.call(infoPages, params.page)) throw new Response('Page not found', { status: 404 });
  return { page: params.page as InfoPageKey };
}
export function meta({ matches, location, loaderData }: Route.MetaArgs) {
  if (!loaderData) return seo({ matches, location }, { title: 'Unscramblenest — Page Not Found', description: 'This page is not available. Return to Unscramblenest to use the English word unscrambler.', noindex: true });
  const content = infoPages[loaderData.page];
  return seo({ matches, location }, { title: content.title.includes('Unscramblenest') ? content.title : `${content.title} | Unscramblenest`, description: content.intro, image: 'https://images.hostinger.com/f3a892e0-c9b1-46f1-8037-c5974a0febd0/4dec862f-673f-407e-a513-008748a1a996.png' });
}
export default function InfoPage({ loaderData }: Route.ComponentProps) { return <InfoContent page={loaderData.page}/>; }
