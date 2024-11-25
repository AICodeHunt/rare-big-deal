'use client';
import React, { useState, useMemo, useCallback } from 'react';
import { slug } from 'github-slugger';
import { allCoreContent } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs } from 'shipixen-contentlayer/generated';
import Link from '@/components/shared/Link';
import { CategorySection } from '@/components/blog/HomeList';

const MAX_DISPLAY = 1000;

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Record<string, string[]>
  >({});

  const sortedPosts = useMemo(() => {
    return allCoreContent(
      allBlogs.filter(
        (post) =>
          post.categories &&
          post.categories.some((cat) => slug(cat) === params.category),
      ),
    );
  }, [params.category]);

  const totalNumberOfPosts = sortedPosts.length;
  const numberOfPostsForSelectedCategory = sortedPosts.filter(
    (post) =>
      (post.subcategories &&
        post.subcategories.some((subcat) =>
          selectedSubcategories[params.category]?.includes(subcat),
        )) ||
      !selectedSubcategories[params.category],
  ).length;

  const toggleSubcategory = useCallback(
    (category: string, subcategory: string) => {
      const nextSelectedSubcategories = { ...selectedSubcategories };
      const selectedSubcategoriesForCategory =
        nextSelectedSubcategories[category] || [];
      const index = selectedSubcategoriesForCategory.indexOf(subcategory);
      if (index === -1) {
        selectedSubcategoriesForCategory.push(subcategory);
      } else {
        selectedSubcategoriesForCategory.splice(index, 1);
      }
      nextSelectedSubcategories[category] = selectedSubcategoriesForCategory;
      setSelectedSubcategories(nextSelectedSubcategories);
    },
    [selectedSubcategories],
  );

  return (
    <div className="flex flex-col w-full items-center justify-between">
      <div className="flex flex-col gap-4 w-full">
        <CategorySection
          category={params.category}
          posts={sortedPosts}
          selectedSubcategories={selectedSubcategories[params.category] || []}
          handleSubcategoryFilter={toggleSubcategory}
          numberOfPosts={MAX_DISPLAY}
          showImage={true}
          overrideClassName="flex flex-col gap-4"
          showTitle={false}
        />

        {totalNumberOfPosts > MAX_DISPLAY && (
          <div className="mt-12 flex text-base font-medium leading-6">
            <Link
              href="/all-articles"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="See all deals"
            >
              See all deals &rarr;
            </Link>
          </div>
        )}

        <footer className="my-6 opacity-50 text-xs flex items-center">
          {numberOfPostsForSelectedCategory} total deals
        </footer>
      </div>
    </div>
  );
}
