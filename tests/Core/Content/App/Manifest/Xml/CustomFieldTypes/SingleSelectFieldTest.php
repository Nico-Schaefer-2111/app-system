<?php declare(strict_types=1);

namespace Swag\SaasConnect\Test\Core\Content\App\Manifest\Xml\CustomFieldTypes;

use PHPUnit\Framework\TestCase;
use Shopware\Core\Framework\Test\TestCaseBase\IntegrationTestBehaviour;
use Swag\SaasConnect\Core\Content\App\Manifest\Manifest;
use Swag\SaasConnect\Core\Content\App\Manifest\Xml\CustomFieldSet;
use Swag\SaasConnect\Core\Content\App\Manifest\Xml\CustomFieldTypes\SingleSelectField;
use Swag\SaasConnect\Test\CustomFieldTypeTestBehaviour;

class SingleSelectFieldTest extends TestCase
{
    use IntegrationTestBehaviour;
    use CustomFieldTypeTestBehaviour;

    public function testCreateFromXml(): void
    {
        $manifest = Manifest::createFromXmlFile(__DIR__ . '/_fixtures/single-select-field.xml');

        static::assertNotNull($manifest->getCustomFields());
        static::assertCount(1, $manifest->getCustomFields()->getCustomFieldSets());

        /** @var CustomFieldSet $customFieldSet */
        $customFieldSet = $manifest->getCustomFields()->getCustomFieldSets()[0];

        static::assertCount(1, $customFieldSet->getFields());

        $singleSelectField = $customFieldSet->getFields()[0];
        static::assertInstanceOf(SingleSelectField::class, $singleSelectField);
        static::assertEquals('test_single_select_field', $singleSelectField->getName());
        static::assertEquals([
            'en-GB' => 'Test single-select field',
        ], $singleSelectField->getLabel());
        static::assertEquals([], $singleSelectField->getHelpText());
        static::assertEquals(1, $singleSelectField->getPosition());
        static::assertEquals(['en-GB' => 'Choose an option...'], $singleSelectField->getPlaceholder());
        static::assertFalse($singleSelectField->getRequired());
        static::assertEquals([
            'first' => [
                'en-GB' => 'First',
                'de-DE' => 'Erster',
            ],
            'second' => [
                'en-GB' => 'Second',
            ],
        ], $singleSelectField->getOptions());
    }

    public function testToEntityArray(): void
    {
        $singleSelectField = $this->importCustomField(__DIR__ . '/_fixtures/single-select-field.xml');

        static::assertEquals('test_single_select_field', $singleSelectField->getName());
        static::assertEquals('select', $singleSelectField->getType());
        static::assertTrue($singleSelectField->isActive());
        static::assertEquals([
            'label' => [
                'en-GB' => 'Test single-select field',
            ],
            'helpText' => [],
            'placeholder' => [
                'en-GB' => 'Choose an option...',
            ],
            'componentName' => 'sw-single-select',
            'customFieldType' => 'select',
            'customFieldPosition' => 1,
            'options' => [
                [
                    'label' => [
                        'en-GB' => 'First',
                        'de-DE' => 'Erster',
                    ],
                    'value' => 'first',
                ],
                [
                    'label' => [
                        'en-GB' => 'Second',
                    ],
                    'value' => 'second',
                ],
            ],
        ], $singleSelectField->getConfig());
    }
}
