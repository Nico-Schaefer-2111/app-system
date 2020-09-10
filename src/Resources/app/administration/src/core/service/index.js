import AppActionButtonService from './api/app-action-button.service';
import AppModulesService from './api/app-modules.service';
import AppAppUrlChangeService from './api/app-url-change.service';

function installServices(Shopware) {
    Shopware.Application.addServiceProvider(AppActionButtonService.name, () => {
        const init = Shopware.Application.getContainer('init');
        return new AppActionButtonService(init.httpClient, Shopware.Service('loginService'));
    });

    Shopware.Application.addServiceProvider(AppModulesService.name, () => {
        const init = Shopware.Application.getContainer('init');
        return new AppModulesService(init.httpClient, Shopware.Service('loginService'));
    });

    Shopware.Application.addServiceProvider(AppAppUrlChangeService.name, () => {
        const init = Shopware.Application.getContainer('init');
        return new AppAppUrlChangeService(init.httpClient, Shopware.Service('loginService'));
    });
}

export default installServices;
