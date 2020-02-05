<?php declare(strict_types=1);

namespace Swag\SaasConnect\Core\Content\App\Lifecycle;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Swag\SaasConnect\Core\Content\App\Manifest\Xml\CustomFields;
use Swag\SaasConnect\Core\Content\App\Manifest\Xml\CustomFieldSet;

class CustomFieldPersister
{
    /**
     * @var EntityRepositoryInterface
     */
    private $customFieldSetRepository;

    public function __construct(EntityRepositoryInterface $customFieldSetRepository)
    {
        $this->customFieldSetRepository = $customFieldSetRepository;
    }

    public function updateCustomFields(?CustomFields $customFields, string $appId, Context $context): void
    {
        $this->deleteCustomFieldsForApp($appId, $context);
        $this->addCustomFields($customFields, $appId, $context);
    }

    private function deleteCustomFieldsForApp(string $appId, Context $context): void
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('appId', $appId));

        /** @var array<string> $ids */
        $ids = $this->customFieldSetRepository->searchIds($criteria, $context)->getIds();

        if (!empty($ids)) {
            $ids = array_map(static function (string $id): array {
                return ['id' => $id];
            }, $ids);

            $this->customFieldSetRepository->delete($ids, $context);
        }
    }

    private function addCustomFields(?CustomFields $customFields, string $appId, Context $context): void
    {
        if (!$customFields || empty($customFields->getCustomFieldSets())) {
            return;
        }

        $payload = $this->generateCustomFieldSets($customFields->getCustomFieldSets(), $appId);

        $this->customFieldSetRepository->upsert($payload, $context);
    }

    /**
     * @param array<CustomFieldSet> $customFieldSets
     * @return array<array<string, string|array<string>|array<string, string|bool|array<string, string>>>>
     */
    private function generateCustomFieldSets(array $customFieldSets, string $appId): array
    {
        $payload = [];

        /** @var CustomFieldSet $customFieldSet */
        foreach ($customFieldSets as $customFieldSet) {
            $payload[] = $customFieldSet->toEntityArray($appId);
        }

        return $payload;
    }
}
