<?php declare(strict_types=1);

namespace Swag\SaasConnect\Test\Core\Command;

use PHPUnit\Framework\TestCase;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\Test\TestCaseBase\IntegrationTestBehaviour;
use Swag\SaasConnect\Core\Command\UninstallAppCommand;
use Swag\SaasConnect\Test\StorefrontAppRegistryTestBehaviour;
use Symfony\Component\Console\Tester\CommandTester;

class UninstallAppCommandTest extends TestCase
{
    use IntegrationTestBehaviour;
    use StorefrontAppRegistryTestBehaviour;

    /**
     * @var EntityRepositoryInterface
     */
    private $appRepository;

    public function setUp(): void
    {
        $this->appRepository = $this->getContainer()->get('saas_app.repository');
    }

    public function testUninstall(): void
    {
        $this->appRepository->create([[
            'name' => 'SwagApp',
            'path' => __DIR__ . '/_fixtures/withPermissions',
            'version' => '0.9.0',
            'label' => 'test',
            'accessToken' => 'test',
            'integration' => [
                'label' => 'test',
                'writeAccess' => false,
                'accessKey' => 'test',
                'secretAccessKey' => 'test',
            ],
            'aclRole' => [
                'name' => 'SwagApp',
            ],
        ]], Context::createDefaultContext());

        $commandTester = new CommandTester($this->getContainer()->get(UninstallAppCommand::class));

        $commandTester->execute(['name' => 'SwagApp']);

        static::assertEquals(0, $commandTester->getStatusCode());

        static::assertStringContainsString('[OK] App uninstalled successfully.', $commandTester->getDisplay());
    }

    public function testUninstallWithNotFoundApp(): void
    {
        $commandTester = new CommandTester($this->getContainer()->get(UninstallAppCommand::class));

        $commandTester->execute(['name' => 'SwagApp']);

        static::assertEquals(1, $commandTester->getStatusCode());

        static::assertStringContainsString('[ERROR] No app with name "SwagApp" installed.', $commandTester->getDisplay());
    }
}
