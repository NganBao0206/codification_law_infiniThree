import $ from 'jquery';

const scrollToElement = (location) => {
    const element = $(`.overflow-y-auto [name=${location}]`);
    if (element.length > 0) {
        $('.overflow-y-auto').animate({
            scrollTop: element.offset().top - $('.overflow-y-auto').offset().top + $('.overflow-y-auto').scrollTop()
        }, 2000);
    }
}

const scrollToTop = () => {
    const element = $(`.overflow-y-auto`);
    $('.overflow-y-auto').animate({
        scrollTop: 0
    }, 2000);

}

export { scrollToElement, scrollToTop };