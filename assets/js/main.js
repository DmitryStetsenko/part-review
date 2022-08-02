const pagesList = getPages('desktop');
console.log(pagesList);

function getPages(type) {
    const baseUrl = `./assets/pages-src/${type}/` ;
    const pagesName = [
        'user.html',
        'brands.html',
        'brands-all.html',
        'brands-spareparts.html',
        'brands-spare-parts-all.html',
        'car-brand.html',
        'comparison.html',
        'comparison-all.html',
        'index.html',
        'info.html',
        'model.html',
        'model-spareparts.html',
        'ratings.html',
        'ratings-all.html',
        'spare-parts.html',
        'spare-parts-all.html',
    ];
    const pagesUrl = pagesName.map((pageName) => baseUrl + pageName);
    return pagesUrl;
}

