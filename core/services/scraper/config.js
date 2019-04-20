module.exports = [
    {
        id: 1,
        name: 'MD Computers',
        url: 'https://mdcomputers.in/index.php?route=product/search',
        selectors: {
            product: '#content > div.products-category > div.products-list.row.nopadding-xs > div',
            name: 'h4',
            price: '.price-new',
            availability: '.label-stock.label',
            url: 'h4 > a',
            image: 'a > img'
        },
        params: {
            limit: 'number',
            page: 'number'
        }
    }
];
