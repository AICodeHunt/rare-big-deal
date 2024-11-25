'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Blog } from 'shipixen-contentlayer/generated';
import Image from '@/components/shared/Image';
import { InteractiveStatCard } from '@/components/shared/InteractiveStatCard';
import { StatCardButtonHoverComponent } from '@/components/shared/StatCardButtonHoverComponent';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import { hashStringToColor } from '@/components/shared/util/hash-string-color';

function processTitle(title: string): string {
  const delimiters = [':', ',', '.', '-'];
  for (const delimiter of delimiters) {
    if (title.includes(delimiter)) {
      title = title.split(delimiter)[0];
    }
  }
  const words = title.split(' ').slice(0, 5);
  return words.join(' ');
}

export function PostItem({
  post,
  showImage,
}: {
  post: CoreContent<Blog>;
  showImage: boolean;
}) {
  const {
    path,
    slug,
    date,
    title,
    summary,
    tags,
    images,
    logo,
    deal,
    website,
    leaderboardPosition,
  } = post;
  const firstImage = images?.[0];
  const [showDescription, setShowDescription] = useState(false);
  const fallbackImage = '/static/images/logo.png';
  const tintColor = hashStringToColor(title);
  const processedTitle = processTitle(title);

  return (
    <InteractiveStatCard
      href={`/products/${slug}`}
      disabled={false}
      hoverComponent={
        <StatCardButtonHoverComponent
          subtitle={
            `${summary?.slice(0, 60)}${
              summary?.length && summary?.length > 60 ? '...' : ''
            }` || 'Read more'
          }
        />
      }
      bgBlurStrength="none"
      shadowStrength="none"
      className={clsx(
        'group !py-1 !border-none !bg-white-100/80 dark:!bg-black/50 !min-h-0',
      )}
    >
      <div className="w-full px-3 py-1">
        {leaderboardPosition !== -1 ? (
          <></>
        ) : (
          <>
            {logo ? (
              <Image
                aria-hidden="true"
                className="absolute w-full h-full left-0 top-0 -z-100 opacity-20 dark:opacity-20 saturate-200 dark:saturate-[3] blur-2xl bg-cover"
                src={logo}
                alt={title}
                width={200}
                height={200}
              />
            ) : (
              <div
                className="absolute w-full h-full left-0 top-0 -z-100 opacity-20 dark:opacity-20 saturate-200 dark:saturate-[3] blur-2xl bg-cover"
                style={{
                  backgroundImage: `url(${fallbackImage})`,
                  backgroundColor: tintColor,
                }}
              />
            )}
          </>
        )}

        <section
          className={clsx(
            'w-full flex flex-wrap sm:flex-nowrap items-center gap-2',
          )}
        >
          <div className="flex gap-2 items-center truncate">
            <figure
              className={clsx(
                'w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden bg-white/50 dark:bg-black/50 border-1 border-solid border-white dark:border-black',
              )}
            >
              {logo ? (
                <Image
                  src={logo}
                  alt="Product Thumbnail"
                  width={200}
                  height={200}
                  className="dark:bg-white/20"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${fallbackImage})`,
                    backgroundColor: tintColor,
                  }}
                />
              )}
            </figure>

            <div className="w-full h-full flex flex-col justify-between gap-1 dark:text-slate-300 truncate flex-shrink-0">
              <p className="text-xs sm:text-sm truncate">{processedTitle}</p>
            </div>
          </div>

          <div className="ml-auto w-full sm:w-auto flex-shrink flex gap-2 tabular-nums max-w-sm text-left sm:text-right">
            <span
              className={cn(
                'flex-col flex gap-1 items-center text-[0.7rem] sm:text-xs p-2 min-w-[40px]',
              )}
            >
              <ReactMarkdown
                className="text-gray-900 dark:text-gray-100"
                disallowedElements={['a']}
              >
                {deal}
              </ReactMarkdown>
            </span>
          </div>
        </section>
      </div>
    </InteractiveStatCard>
  );
}
