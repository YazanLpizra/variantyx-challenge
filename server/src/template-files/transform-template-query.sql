with joined_data as (
	select
		posts.id as "post_id",
		posts.post_title as "post_title",
		postmeta.meta_key,
		postmeta.meta_value,
		term_taxonomy.name as "category_name"
	from
		hq_posts posts
		inner join hq_term_relationships relationships on relationships.object_id = posts.ID
		inner join hq_term_taxonomy term_taxonomy on term_taxonomy.term_taxonomy_id = relationships.term_taxonomy_id
		inner join hq_terms terms on terms.term_id = term_taxonomy.term_id
		left join hq_postmeta postmeta on posts.id = postmeta.post_id 
	where
		term_taxonomy.taxonomy = 'product_cat'
),
filtered_data as (
	select
		*
	from
		joined_data
	where
    {{WHERE_CLAUSES}}
),
select
	*
from
	filtered_data;