import Header from '@/components/shared/Header';
import { LandingPrimaryTextCtaSection } from '@/components/landing/cta/LandingPrimaryCta';
import { LandingSocialProof } from '@/components/landing/social-proof/LandingSocialProof';
import { LandingTestimonialGrid } from '@/components/landing/testimonial/LandingTestimonialGrid';
import { LandingBandSection } from '@/components/landing/LandingBand';
import { LandingTestimonialReadMoreWrapper } from '@/components/landing/testimonial/LandingTestimonialReadMoreWrapper';
import { LandingFaqCollapsibleSection } from '@/components/landing/LandingFaqCollapsible';
import { Button } from '@/components/shared/ui/button';
import HomeList from '@/components/blog/HomeList';
import stats from '@/data/stats';
import { metadata } from '@/data/config/metadata';
import { Showcase } from '@/components/showcase/Showcase';
import { picksIndex } from '@/data/picks/index';
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

const weightedBundles = [
  ...Array(3).fill('ai-apps.js'),
  ...Array(2).fill('mac-apps.js'),
  ...Array(2).fill('niche-apps.js'),
  ...picksIndex.filter(
    (bundle) =>
      !['ai-apps.js', 'mac-apps.js', 'niche-apps.js'].includes(bundle),
  ),
];

const getRandomBundle = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const randomIndex =
    (Math.floor(minutes / 20) + now.getHours()) % weightedBundles.length;
  return weightedBundles[randomIndex];
};

const loadBundle = async (bundleName) => {
  const m = await import(`@/data/picks/${bundleName}`);
  return m.default;
};

export default async function Home() {
  const bundleName = getRandomBundle();
  const bundle = await loadBundle(bundleName);
  const users = (stats.stars || 0) + (stats.forks || 0);

  return (
    <div className="flex flex-col w-full items-center fancy-overlay">
      <Header className="mb-0 lg:mb-0" />
      <LandingPrimaryTextCtaSection
        title="Rare Deals and Discounts"
        descriptionComponent={
          <p className="max-w-2xl">
            Save big on limited time deals on selected SaaS, software, apps &
            services. Discounts for Black Friday, Cyber Monday & beyond.
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

      {bundle && <Showcase className="mt-8" bundle={bundle} />}

      <section className="max-w-2xl 2xl:max-w-6xl w-full mt-12 p-6">
        <HomeList />
      </section>

      <LandingBandSection
        title="Stars! Stars everywhere!"
        description="Our users love us! There's no place as beautiful to post a deal."
        supportingComponent={
          <LandingSocialProof
            showRating
            numberOfUsers={users}
            avatarItems={avatars}
          />
        }
      />

      <LandingTestimonialReadMoreWrapper size="md">
        <LandingTestimonialGrid
          title="Hear It from Our Users"
          description="Discover what our happy customers have to say about their experience with our AI app:"
          testimonialItems={[
            {
              name: 'Csaba Kissi',
              text: 'Nice work!',
              handle: '@csaba.bsky.social',
              imageSrc: '/static/images/people/22.jpg',
              url: 'https://bsky.app/profile/csaba.bsky.social/post/3lbfwvsk4us2c',
            },

            {
              name: 'AP',
              text: 'Great work 💪',
              handle: '@anhphong_dev',
              imageSrc: '/static/images/people/18.jpg',
              url: 'https://x.com/anhphong_dev/status/1859277954091712711',
            },
            {
              name: 'Sam',
              text: 'Thats a great list of discounts. Super helpful.',
              handle: '@sambruce23',
              imageSrc: '/static/images/people/19.webp',
              url: 'https://www.reddit.com/r/SaaS/comments/1gucxgx/comment/lxu9y37/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
              featured: true,
            },
            {
              name: 'Adam R.',
              text: 'Oh great idea [...]',
              handle: '@adam_riha',
              imageSrc: '/static/images/people/3.jpeg',
              url: 'https://www.reddit.com/r/SaaS/comments/1gucxgx/comment/lxttiqv/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
            },

            {
              name: 'Martin B.',
              text: 'Very nice idea to pull the metadata from the websites and create standalone pages instead of just a table!',
              handle: '@martin_buur',
              imageSrc: '/static/images/people/20.png',
              url: 'https://www.reddit.com/r/SaaS/comments/1gucxgx/comment/lxw0vk5/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
            },
            {
              name: 'Isaac',
              text: '[...] the site is awesome [...]',
              handle: '@IMadeAGlitch',
              imageSrc: '/static/images/people/21.jpg',
              url: 'https://x.com/IMadeAGlitch/status/1858975664025817236',
            },
            {
              name: 'CranQ',
              text: 'A person of the people!',
              handle: '@CranQnow',
              imageSrc: '/static/images/people/17.jpg',
              url: 'https://x.com/CranQnow/status/1859549466879025423',
            },
          ]}
          withBackgroundGlow
        />
      </LandingTestimonialReadMoreWrapper>

      <LandingFaqCollapsibleSection
        title="Got Questions? We've Got Answers!"
        description="Find answers to common inquiries about our deal & discount platform:"
        faqItems={[
          {
            question: 'How do I submit a deal?',
            answer: (
              <>
                You can submit a deal by creating a pull request at{' '}
                <a
                  href="https://github.com/danmindru/rare-big-deal/pulls"
                  className="underline"
                >
                  github.com/danmindru/rare-big-deal/pulls
                </a>
                . All submissions are automatically accepted in order of
                submission.
              </>
            ),
          },
          {
            question: 'Where can I see the submitted deals?',
            answer: (
              <>
                All submitted deals are featured on our webpage at{' '}
                <a href="https://rarebigdeal.com" className="underline">
                  rarebigdeal.com
                </a>
                . The submissions will be categorized and displayed
                alphabetically and you'll get a standalone page for your deal.
              </>
            ),
          },
          {
            question: 'Are all deals accepted?',
            answer:
              'Yes, as long as you have a deal, it will be accepted and featured on our webpage.',
          },
          {
            question: 'Is the process automated?',
            answer:
              'Yes, everything is automated after submission. If you need any manual changes, please raise a pull request.',
          },
          {
            question: 'Can I make changes to my submitted deal?',
            answer:
              'Yes, you can make changes by raising a pull request with the necessary modifications.',
          },
          {
            question: 'How are deals ordered?',
            answer:
              'Deals are ordered based on the time of submission on the Github repo, with the latest submissions appearing at the bottom. On the webpage, they ordered b alphabetically and grouped by category.',
          },
          {
            question: 'Is there a limit to the number of deals I can submit?',
            answer:
              'No, there is no limit to the number of deals you can submit.',
          },
          {
            question: 'Do I need coding skills to submit a deal?',
            answer:
              'No, you do not need coding skills. Simply create a pull request with your deal details.',
          },
          {
            question:
              'How long does it take for my deal to appear on the webpage?',
            answer:
              'Deals are processed automatically and should appear on the webpage shortly after submission.',
          },
          {
            question: 'Can I feature my deal at the top of the list?',
            answer: (
              <>
                There is no option to do that currently. Get in touch with us at{' '}
                <a href={metadata.twitter} className="underline">
                  here
                </a>{' '}
                for more information.
              </>
            ),
          },
          {
            question:
              'What information do I need to include in my deal submission?',
            answer:
              'Please take a previous deal as an example and include all the necessary information in your submission. You need a name, short description and a deal text as a minimum.',
          },
          {
            question: 'Can I delete my submitted deal?',
            answer:
              'If you need to delete your submitted deal, please raise a pull request with the request for deletion.',
          },
        ]}
        withBackground
      />
    </div>
  );
}
