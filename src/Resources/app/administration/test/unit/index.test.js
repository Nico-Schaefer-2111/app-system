describe('index.js', () => {
    test('It registers services after install method', () => {
        expect(Shopware.Service('AppActionButtonService')).toBeDefined();
        expect(Shopware.Service('AppUrlChangeService')).toBeDefined();
    });
});
