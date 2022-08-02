const doc = document;
const pagesTabBlockContent = doc.querySelector('.pages-tab-block__content');
const tabsHtmlEL = doc.querySelector('.tabs');
const pagesList = getPages('desktop');

renderMenu(pagesList, tabsHtmlEL);
renderPages(pagesList, pagesTabBlockContent);

function renderMenu(pagesListArr, target) {
    const menuBlock = doc.createElement('ul');
    menuBlock.className = 'page-menu';
    target.after(menuBlock);

    pagesListArr.forEach((item, index) => {
        const num = index + 1;
        const menuItem = `
            <li class="page-menu__item">
                <a href="#page${num}" data-number="${num}">${item.name}</a>
            </li>`;

        menuBlock.insertAdjacentHTML('beforeend', menuItem);
    });
}

function renderPages(pagesListArr, target) {
    const pagesBlock = doc.createElement('ul');
    pagesBlock.className = 'pages';
    target.append(pagesBlock);

    pagesListArr.forEach((item, index) => {
        const num = index + 1;
        const page = `
            <li class="page" data-number="${num}" id="page${num}">
                <div class="page__info">
                    <div class="page__info-wrapper">
                        <h3 class="page__name">
                            <a href="${item.url}" target="_blank">${item.name}.html</a>
                        </h3>
                        <p class="page__descr">${item.descr}</p>
                    </div>
                    <a href="${item.url}" target="_blank" class="btn btn--link"></a>
                    <button class="btn btn--full-screen"></button>
                </div>
                
                <iframe src="${item.url}" frameborder="0"></iframe>
            </li>`;

        pagesBlock.insertAdjacentHTML('beforeend', page);

        doc.querySelectorAll('.btn--full-screen')
            .forEach(item => item.onclick = fullScreenBtnHandler);
    });
}

function fullScreenBtnHandler() {
    const pageEl = this.closest('.page');
    pageEl.classList.toggle('page--full-screen');
    this.classList.toggle('btn--close');
    doc.body.classList.toggle('noscroll');
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



