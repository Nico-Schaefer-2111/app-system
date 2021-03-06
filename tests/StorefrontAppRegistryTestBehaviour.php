<?php declare(strict_types=1);

namespace Swag\SaasConnect\Test;

use Shopware\Core\Framework\Adapter\Twig\TemplateFinder;
use Shopware\Storefront\Theme\StorefrontPluginRegistry;
use Swag\SaasConnect\Core\Framework\Adapter\Twig\EntityTemplateLoader;
use Symfony\Component\DependencyInjection\ContainerInterface;

trait StorefrontAppRegistryTestBehaviour
{
    /**
     * @before
     */
    public function clearStorefrontAppRegistryCache(): void
    {
        $registry = $this->getContainer()
            ->get(StorefrontPluginRegistry::class);

        $inner = (new \ReflectionClass($registry))->getProperty('inner');
        $inner->setAccessible(true);

        $reset = function (): void {
            $this->pluginConfigurations = null;
        };

        $reset->call($registry);
        $reset->call($inner->getValue($registry));
    }

    /**
     * @before
     */
    public function clearEntityTemplateLoaderDatabaseCache(): void
    {
        $templateLoader = $this->getContainer()
            ->get(EntityTemplateLoader::class);

        $reflection = new \ReflectionClass($templateLoader);
        $prop = $reflection->getProperty('databaseTemplateCache');

        $prop->setAccessible(true);
        $prop->setValue($templateLoader, []);
    }

    /**
     * @before
     */
    public function clearTemplateFinderNamespaceHierarchyCache(): void
    {
        $templateFinder = $this->getContainer()
            ->get(TemplateFinder::class);

        $reflection = new \ReflectionClass($templateFinder);
        $prop = $reflection->getProperty('namespaceHierarchy');

        $prop->setAccessible(true);
        $prop->setValue($templateFinder, null);
    }

    abstract protected function getContainer(): ContainerInterface;
}
