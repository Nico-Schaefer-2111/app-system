<?php declare(strict_types=1);

namespace Swag\SaasConnect\Core\Framework\Api;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Shopware\Core\Framework\Routing\Exception\MissingRequestParameterException;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Swag\SaasConnect\Core\Framework\AppUrlChangeResolver\AppUrlChangeResolverNotFoundException;
use Swag\SaasConnect\Core\Framework\AppUrlChangeResolver\AppUrlChangeResolverStrategy;
use Swag\SaasConnect\Core\Framework\ShopId\ShopIdProvider;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @RouteScope(scopes={"api"})
 */
class AppUrlChangeController extends AbstractController
{
    /**
     * @var AppUrlChangeResolverStrategy
     */
    private $appUrlChangeResolverStrategy;

    /**
     * @var SystemConfigService
     */
    private $systemConfigService;

    public function __construct(
        AppUrlChangeResolverStrategy $appUrlChangeResolverStrategy,
        SystemConfigService $systemConfigService
    ) {
        $this->appUrlChangeResolverStrategy = $appUrlChangeResolverStrategy;
        $this->systemConfigService = $systemConfigService;
    }

    /**
     * @Route("api/v{version}/app-system/app-url-change/strategies", name="api.app_system.app-url-change-strategies", methods={"GET"})
     */
    public function getAvailableStrategies(): JsonResponse
    {
        return new JsonResponse(
            $this->appUrlChangeResolverStrategy->getAvailableStrategies()
        );
    }

    /**
     * @Route("api/v{version}/app-system/app-url-change/resolve", name="api.app_system.app-url-change-resolve", methods={"POST"})
     */
    public function resolve(Request $request, Context $context): Response
    {
        $strategy = $request->get('strategy');

        if (!$strategy) {
            throw new MissingRequestParameterException('strategy');
        }

        try {
            $this->appUrlChangeResolverStrategy->resolve($strategy, $context);
        } catch (AppUrlChangeResolverNotFoundException $e) {
            throw new AppUrlChangeResolverNotFoundHttpException($e);
        }

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * @Route("api/v{version}/app-system/app-url-change/url-difference", name="api.app_system.app-url-difference", methods={"GET"})
     */
    public function getUrlDifference(): Response
    {
        if (!$this->systemConfigService->get(ShopIdProvider::SHOP_DOMAIN_CHANGE_CONFIG_KEY)) {
            return new Response(null, Response::HTTP_NO_CONTENT);
        }
        /** @var array<string, string>  $shopIdConfig */
        $shopIdConfig = $this->systemConfigService->get(ShopIdProvider::SHOP_ID_SYSTEM_CONFIG_KEY);
        $oldUrl = $shopIdConfig['app_url'];

        return new JsonResponse(
            [
                'oldUrl' => $oldUrl,
                'newUrl' => $_SERVER['APP_URL'],
            ]
        );
    }
}
