UPDATE public.bible_books SET slug = 'cantico' WHERE slug = 'cantares';
ALTER TABLE public.reading_progress
  ADD CONSTRAINT reading_progress_user_book_chapter_unique UNIQUE (user_id, book_slug, chapter);