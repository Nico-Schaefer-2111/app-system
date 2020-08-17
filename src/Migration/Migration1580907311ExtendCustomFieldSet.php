<?php declare(strict_types=1);

namespace Swag\SaasConnect\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1580907311ExtendCustomFieldSet extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1580907311;
    }

    public function update(Connection $connection): void
    {
        $connection->executeUpdate('
            ALTER TABLE `custom_field_set`
            ADD COLUMN `saas_app_id` BINARY(16) NULL AFTER `active`,
            ADD CONSTRAINT `fk.custom_field_set.saas_app_id` FOREIGN KEY (`saas_app_id`) REFERENCES `saas_app` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        // nth
    }
}
