<?php declare(strict_types=1);

namespace Swag\SaasConnect\Test\Core\Framework\Webhook;

use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Swag\SaasConnect\Core\Framework\Webhook\WebhookCacheClearer;
use Swag\SaasConnect\Core\Framework\Webhook\WebhookDispatcher;

class WebhookCacheClearerTest extends TestCase
{
    public function testGetSubscribedEvents(): void
    {
        static::assertEquals([
            'saas_webhook.written' => 'clearWebhookCache',
        ], WebhookCacheClearer::getSubscribedEvents());
    }

    public function testClearWebhookCache(): void
    {
        /** @var MockObject $dispatcherMock */
        $dispatcherMock = $this->createMock(WebhookDispatcher::class);
        $dispatcherMock->expects(static::once())
            ->method('clearInternalCache');

        $cacheClearer = new WebhookCacheClearer($dispatcherMock);
        $cacheClearer->clearWebhookCache();
    }
}
