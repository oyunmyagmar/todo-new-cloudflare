CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`completed` integer DEFAULT false,
	`created_at` text DEFAULT '2026-02-03T20:51:45.862Z'
);
