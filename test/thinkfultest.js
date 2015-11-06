describe('registration', function() {
    it('should visit thinkful and find the log in button', function() {
        browser.get('https://thinkful-slacker-news.herokuapp.com');
        expect(element(by.css('#headerText h1')).getInnerHtml()).toMatch(/Slacker News/);
    });
});