ALTER TABLE `contacts` ADD `jobTitle` varchar(255);--> statement-breakpoint
ALTER TABLE `contacts` ADD `sector` varchar(255);--> statement-breakpoint
ALTER TABLE `contacts` ADD `serviceType` varchar(255);--> statement-breakpoint
ALTER TABLE `contacts` ADD `urgency` enum('low','medium','high') DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE `contacts` ADD `howFound` varchar(255);--> statement-breakpoint
ALTER TABLE `contacts` ADD `preferredContact` enum('email','phone','whatsapp') DEFAULT 'email';