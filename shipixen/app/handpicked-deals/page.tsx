import Header from '@/components/shared/Header';
import { LandingPrimaryTextCtaSection } from '@/components/landing/cta/LandingPrimaryCta';
import { LandingSocialProof } from '@/components/landing/social-proof/LandingSocialProof';
import { Button } from '@/components/shared/ui/button';
import { Showcase } from '@/components/showcase/Showcase';
import { picksIndex } from '@/data/picks/index';
import stats from '@/data/stats';
import Link from 'next/link';

const avatars = [
  {
    imageSrc: '/static/images/people/13.png',
    name: 'Daniel Nguyen',
  },
  {
    imageSrc: '/static/images/people/1.png',
    name: 'Matthias',
  },
  {
    imageSrc: '/static/images/people/2.jpeg',
    name: 'Tropiano',
  },
  {
    imageSrc: '/static/images/people/4.jpeg',
    name: 'Catalin',
  },
  {
    imageSrc: '/static/images/people/14.png',
    name: 'Fekri',
  },
  {
    imageSrc: '/static/images/people/15.jpeg',
    name: 'Serg',
  },
];

const loadBundles = () => {
  return Promise.all(
    picksIndex.map(async (bundleName) => {
      const m = await import(`@/data/picks/${bundleName}`);
      return m.default;
    }),
  );
};

export default async function AllBundles() {
  const bundles = await loadBundles();
  const users = (stats.stars || 0) + (stats.forks || 0);

  return (
    <div className="flex flex-col w-full items-center fancy-overlay">
      <Header className="mb-0 lg:mb-0" />

      <LandingPrimaryTextCtaSection
        title="All Bundles"
        descriptionComponent={
          <p className="max-w-2xl">
            We've handpicked the best AI, Marketing, DevTool apps that ever
            existed. Now with crazy discounts!
          </p>
        }
        textPosition="center"
        withBackground
        className="relative"
      >
        <div className="flex flex-wrap justify-center gap-2">
          <Button size="xl" variant="primary" asChild>
            <Link href="/handpicked-deals">Best Deals</Link>
          </Button>

          <Button size="xl" variant="outlinePrimary">
            <Link href="/categories/developer-tools">All Categories</Link>
          </Button>
        </div>

        <div className="flex items-center">
          <LandingSocialProof
            className="w-full mt-12"
            showRating
            numberOfUsers={users}
            suffixText="happy users"
            avatarItems={avatars}
          />
        </div>
      </LandingPrimaryTextCtaSection>

      <section className="max-w-2xl 2xl:max-w-6xl w-full">
        {bundles.map((bundle, index) => (
          <Showcase
            key={index}
            className="mt-8"
            bundle={bundle}
            autoplayOnHover
          />
        ))}
      </section>
    </div>
  );
}
