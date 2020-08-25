<?php declare(strict_types=1);

namespace Swag\SaasConnect\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1578889830ActionButton extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1578889830;
    }

    public function update(Connection $connection): void
    {
        $connection->executeUpdate('
            CREATE TABLE `saas_app_action_button` (
                `id` BINARY(16) NOT NULL,
                `entity` VARCHAR(255) NOT NULL,
                `view` VARCHAR(255) NOT NULL,
                `url` VARCHAR(255) NOT NULL,
                `action` VARCHAR(255) NULL,
                `open_new_tab` TINYINT(1) NULL DEFAULT \'0\',
                `app_id` BINARY(16) NOT NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                PRIMARY KEY (`id`),
                KEY `fk.saas_app_action_button.app_id` (`app_id`),
                CONSTRAINT `fk.saas_app_action_button.app_id` FOREIGN KEY (`app_id`) REFERENCES `saas_app` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT `uniq.saas_app_action_button.action` UNIQUE (`action`, `app_id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');

        $connection->executeUpdate('
            CREATE TABLE `saas_app_action_button_translation` (
                `label` VARCHAR(255) NOT NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                `saas_app_action_button_id` BINARY(16) NOT NULL,
                `language_id` BINARY(16) NOT NULL,
                PRIMARY KEY (`saas_app_action_button_id`,`language_id`),
                KEY `fk.saas_app_action_button_translation.saas_app_action_button_id` (`saas_app_action_button_id`),
                KEY `fk.saas_app_action_button_translation.language_id` (`language_id`),
                CONSTRAINT `fk.saas_app_action_button_translation.saas_app_action_button_id` FOREIGN KEY (`saas_app_action_button_id`) REFERENCES `saas_app_action_button` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT `fk.saas_app_action_button_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        // nth
    }
}
