const doc = document;
const pagesTabBlockContent = doc.querySelector('.pages-tab-block__content');
const pagesList = getPages('mobile');

renderPages(pagesList, pagesTabBlockContent);

function renderPages(pagesListArr, target) {
    const pagesBlock = doc.createElement('ul');
    pagesBlock.className = 'pages';
    target.append(pagesBlock);

    pagesListArr.forEach(item => {
        const page = `
            <li class="page">
                <div class="page__info">
                    <div class="page__info-wrapper">
                        <h3 class="page__name">index.html</h3>
                        <p class="page__descr">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum
                            dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.
                        </p>
                    </div>
                    <a href="" target="_blank" class="btn btn--link"></a>
                    <button class="btn btn--full-screen"></button>
                </div>
                
                <iframe src="./assets/pages-src/desktop/brands-all.html" frameborder="0"></iframe>
            </li>`;

        pagesBlock.insertAdjacentHTML('beforeend', page);
    });
}

function getPages(type) {
    const baseUrl = `./assets/pages-src/${type}/` ;
    const pagesInfoList =[
        {
            name: 'user',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'brands',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'brands-all',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'brands-spareparts',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'brands-spare-parts-all',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'car-brand',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'comparison',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'comparison-all',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'index',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'info',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'model',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'model-spareparts',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'ratings',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'ratings-all',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'spare-parts',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
        {
            name: 'spare-parts-all',
            descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit officia soluta earum dignissimos fugit aliquam necessitatibus sapiente explicabo ullam temporibus.',
        },
    ];
    const pagesFullInfo = pagesInfoList.map((item) => {
        const pageItem = {...item, url: baseUrl + item.name + '.html'};
        return pageItem;
    });
    return pagesFullInfo;
}

